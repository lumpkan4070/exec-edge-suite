-- Fix RLS policies on profiles table to ensure strict access control
-- Drop existing policies that might be overly permissive
DROP POLICY IF EXISTS "Users can get or create their own profile via function" ON public.profiles;

-- Recreate specific, restrictive policies
CREATE POLICY "Users can view only their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert only their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update only their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create a security definer function for profile operations to prevent RLS issues
CREATE OR REPLACE FUNCTION public.get_user_profile(target_user_id uuid DEFAULT auth.uid())
RETURNS TABLE (
  id uuid,
  user_id uuid,
  email text,
  display_name text,
  role text,
  goals text[],
  preferences jsonb,
  tier text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow users to get their own profile
  IF target_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied: can only access own profile';
  END IF;
  
  RETURN QUERY
  SELECT 
    p.id,
    p.user_id,
    p.email,
    p.display_name,
    p.role,
    p.goals,
    p.preferences,
    p.tier,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.user_id = target_user_id;
END;
$$;