-- Fix the profile creation trigger and ensure it works properly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Insert profile with proper error handling
  INSERT INTO public.profiles (
    user_id, 
    email, 
    role, 
    display_name,
    tier,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'executive'),
    COALESCE(
      NEW.raw_user_meta_data ->> 'display_name', 
      NEW.raw_user_meta_data ->> 'name',
      split_part(NEW.email, '@', 1)
    ),
    'trial',
    now(),
    now()
  );
  
  -- Initialize user progress
  INSERT INTO public.user_progress (
    user_id,
    total_points,
    current_streak,
    longest_streak,
    habits_completed_today,
    habits_completed_this_week,
    confidence_level,
    last_updated
  )
  VALUES (
    NEW.id,
    0,
    0,
    0,
    0,
    0,
    75,
    now()
  );
  
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't prevent user creation
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to safely get or create user profile
CREATE OR REPLACE FUNCTION public.get_or_create_user_profile(user_id_param UUID)
RETURNS TABLE(
  id UUID,
  user_id UUID,
  email TEXT,
  display_name TEXT,
  role TEXT,
  goals TEXT[],
  preferences JSONB,
  tier TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  profile_record RECORD;
  user_record RECORD;
BEGIN
  -- Try to get existing profile
  SELECT * INTO profile_record 
  FROM public.profiles p 
  WHERE p.user_id = user_id_param;
  
  -- If profile exists, return it
  IF FOUND THEN
    RETURN QUERY SELECT 
      profile_record.id,
      profile_record.user_id,
      profile_record.email,
      profile_record.display_name,
      profile_record.role,
      profile_record.goals,
      profile_record.preferences,
      profile_record.tier,
      profile_record.created_at,
      profile_record.updated_at;
    RETURN;
  END IF;
  
  -- Profile doesn't exist, get user data and create it
  SELECT * INTO user_record 
  FROM auth.users 
  WHERE id = user_id_param;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found';
  END IF;
  
  -- Create missing profile
  INSERT INTO public.profiles (
    user_id, 
    email, 
    role, 
    display_name,
    tier,
    created_at,
    updated_at
  )
  VALUES (
    user_record.id,
    user_record.email,
    'executive',
    COALESCE(
      user_record.raw_user_meta_data ->> 'display_name',
      user_record.raw_user_meta_data ->> 'name', 
      split_part(user_record.email, '@', 1)
    ),
    'trial',
    now(),
    now()
  )
  RETURNING * INTO profile_record;
  
  -- Create user progress if missing
  INSERT INTO public.user_progress (user_id)
  VALUES (user_id_param)
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Return the new profile
  RETURN QUERY SELECT 
    profile_record.id,
    profile_record.user_id,
    profile_record.email,
    profile_record.display_name,
    profile_record.role,
    profile_record.goals,
    profile_record.preferences,
    profile_record.tier,
    profile_record.created_at,
    profile_record.updated_at;
END;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.get_or_create_user_profile(UUID) TO authenticated;

-- Add policy for the new function
CREATE POLICY "Users can get or create their own profile via function"
ON public.profiles FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Ensure existing user has a profile (fix current user)
DO $$
DECLARE
    existing_user RECORD;
BEGIN
    -- Get the existing user who doesn't have a profile
    FOR existing_user IN 
        SELECT u.id, u.email, u.raw_user_meta_data
        FROM auth.users u
        LEFT JOIN public.profiles p ON u.id = p.user_id
        WHERE p.user_id IS NULL
    LOOP
        -- Create profile for existing user
        INSERT INTO public.profiles (
            user_id, 
            email, 
            role, 
            display_name,
            tier
        )
        VALUES (
            existing_user.id,
            existing_user.email,
            'executive',
            COALESCE(
                existing_user.raw_user_meta_data ->> 'display_name',
                existing_user.raw_user_meta_data ->> 'name',
                split_part(existing_user.email, '@', 1)
            ),
            'trial'
        );
        
        -- Create user progress
        INSERT INTO public.user_progress (user_id)
        VALUES (existing_user.id)
        ON CONFLICT (user_id) DO NOTHING;
        
        RAISE NOTICE 'Created profile for existing user: %', existing_user.email;
    END LOOP;
END $$;