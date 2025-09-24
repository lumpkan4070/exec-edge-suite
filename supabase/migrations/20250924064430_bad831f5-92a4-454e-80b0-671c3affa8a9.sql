-- Fix security warnings by setting proper search_path for functions

-- Drop and recreate functions with proper search_path
DROP FUNCTION IF EXISTS public.calculate_user_streak(UUID);
DROP FUNCTION IF EXISTS public.update_user_progress(UUID);

-- Recreate calculate_user_streak with proper search_path
CREATE OR REPLACE FUNCTION public.calculate_user_streak(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_streak INTEGER := 0;
  check_date DATE := CURRENT_DATE;
  has_completion BOOLEAN;
BEGIN
  -- Start from today and go backwards
  LOOP
    SELECT EXISTS(
      SELECT 1 FROM public.habit_completions 
      WHERE user_id = p_user_id 
      AND completion_date = check_date
    ) INTO has_completion;
    
    IF has_completion THEN
      current_streak := current_streak + 1;
      check_date := check_date - INTERVAL '1 day';
    ELSE
      -- If today has no completions, that's ok, but if yesterday doesn't, streak is broken
      IF check_date = CURRENT_DATE THEN
        check_date := check_date - INTERVAL '1 day';
        CONTINUE;
      ELSE
        EXIT;
      END IF;
    END IF;
  END LOOP;
  
  RETURN current_streak;
END;
$$;

-- Recreate update_user_progress with proper search_path
CREATE OR REPLACE FUNCTION public.update_user_progress(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_points_calc INTEGER;
  current_streak_calc INTEGER;
  longest_streak_calc INTEGER;
  today_count INTEGER;
  week_count INTEGER;
BEGIN
  -- Calculate total points
  SELECT COALESCE(SUM(points_earned), 0) 
  INTO total_points_calc
  FROM public.habit_completions 
  WHERE user_id = p_user_id;
  
  -- Calculate current streak
  SELECT public.calculate_user_streak(p_user_id) INTO current_streak_calc;
  
  -- Calculate habits completed today
  SELECT COUNT(*)
  INTO today_count
  FROM public.habit_completions
  WHERE user_id = p_user_id 
  AND completion_date = CURRENT_DATE;
  
  -- Calculate habits completed this week
  SELECT COUNT(*)
  INTO week_count
  FROM public.habit_completions
  WHERE user_id = p_user_id 
  AND completion_date >= CURRENT_DATE - INTERVAL '6 days';
  
  -- Get current longest streak (don't decrease it)
  SELECT GREATEST(longest_streak, current_streak_calc)
  INTO longest_streak_calc
  FROM public.user_progress
  WHERE user_id = p_user_id;
  
  -- Update progress
  UPDATE public.user_progress
  SET 
    total_points = total_points_calc,
    current_streak = current_streak_calc,
    longest_streak = COALESCE(longest_streak_calc, current_streak_calc),
    habits_completed_today = today_count,
    habits_completed_this_week = week_count,
    last_updated = now()
  WHERE user_id = p_user_id;
  
  -- If no progress record exists, create it
  IF NOT FOUND THEN
    INSERT INTO public.user_progress (
      user_id, total_points, current_streak, longest_streak, 
      habits_completed_today, habits_completed_this_week
    ) VALUES (
      p_user_id, total_points_calc, current_streak_calc, current_streak_calc,
      today_count, week_count
    );
  END IF;
END;
$$;