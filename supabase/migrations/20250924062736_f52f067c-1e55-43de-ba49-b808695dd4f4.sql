-- Create user profiles table with role and preferences
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('sales-leader', 'entrepreneur', 'executive')),
  goals TEXT[] DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  tier TEXT DEFAULT 'trial' CHECK (tier IN ('trial', 'personal', 'professional')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create habits master table
CREATE TABLE public.habits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('strategic', 'leadership', 'mindset', 'productivity', 'wellness')),
  frequency TEXT NOT NULL DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  target_roles TEXT[] DEFAULT '{}',
  difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
  points INTEGER DEFAULT 10,
  content JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user habits tracking table
CREATE TABLE public.user_habits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  custom_frequency TEXT,
  custom_target INTEGER DEFAULT 1,
  started_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, habit_id)
);

-- Create habit completions table
CREATE TABLE public.habit_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  completion_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, habit_id, completion_date)
);

-- Create user progress tracking table
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  habits_completed_today INTEGER DEFAULT 0,
  habits_completed_this_week INTEGER DEFAULT 0,
  confidence_level INTEGER DEFAULT 70 CHECK (confidence_level BETWEEN 0 AND 100),
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  badge_icon TEXT,
  requirements JSONB NOT NULL,
  points_reward INTEGER DEFAULT 50,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create scenarios/content library table
CREATE TABLE public.scenarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('negotiation', 'leadership', 'sales', 'strategy', 'communication')),
  target_roles TEXT[] DEFAULT '{}',
  difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
  content JSONB NOT NULL,
  estimated_duration INTEGER DEFAULT 15, -- minutes
  is_premium BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI recommendations table
CREATE TABLE public.ai_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('habit', 'scenario', 'insight', 'challenge')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Create RLS Policies for habits (public read)
CREATE POLICY "Anyone can view active habits"
ON public.habits FOR SELECT
USING (is_active = true);

-- Create RLS Policies for user_habits
CREATE POLICY "Users can view their own habits"
ON public.user_habits FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own habits"
ON public.user_habits FOR ALL
USING (auth.uid() = user_id);

-- Create RLS Policies for habit_completions
CREATE POLICY "Users can view their own completions"
ON public.habit_completions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own completions"
ON public.habit_completions FOR ALL
USING (auth.uid() = user_id);

-- Create RLS Policies for user_progress
CREATE POLICY "Users can view their own progress"
ON public.user_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own progress"
ON public.user_progress FOR ALL
USING (auth.uid() = user_id);

-- Create RLS Policies for achievements (public read)
CREATE POLICY "Anyone can view active achievements"
ON public.achievements FOR SELECT
USING (is_active = true);

-- Create RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements"
ON public.user_achievements FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can earn achievements"
ON public.user_achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create RLS Policies for scenarios
CREATE POLICY "Anyone can view active scenarios"
ON public.scenarios FOR SELECT
USING (is_active = true);

-- Create RLS Policies for ai_recommendations
CREATE POLICY "Users can view their own recommendations"
ON public.ai_recommendations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can create recommendations"
ON public.ai_recommendations FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their own recommendations"
ON public.ai_recommendations FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, role, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'executive'),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1))
  );
  
  -- Initialize user progress
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert default habits
INSERT INTO public.habits (title, description, category, target_roles, difficulty_level, points, content) VALUES
('Strategic Planning Session', 'Daily 30-minute focused planning on key strategic priorities', 'strategic', ARRAY['executive', 'entrepreneur'], 3, 25, '{"tips": ["Block calendar time", "Focus on 3 key priorities", "Review weekly goals"], "duration": 30}'),
('Team Communication Check-in', 'Connect with team members and provide clear direction', 'leadership', ARRAY['executive', 'sales-leader'], 2, 20, '{"tips": ["Ask open questions", "Listen actively", "Provide specific feedback"], "duration": 15}'),
('Mindfulness Practice', 'Daily meditation or mindfulness exercise for mental clarity', 'mindset', ARRAY['executive', 'entrepreneur', 'sales-leader'], 1, 15, '{"tips": ["Start with 5 minutes", "Focus on breathing", "Use guided apps"], "duration": 10}'),
('Market Analysis Review', 'Stay updated on market trends and competitive landscape', 'strategic', ARRAY['entrepreneur', 'sales-leader'], 3, 30, '{"tips": ["Read industry reports", "Track competitor moves", "Identify opportunities"], "duration": 45}'),
('Leadership Reading', 'Read articles, books, or case studies on leadership and business', 'leadership', ARRAY['executive', 'entrepreneur'], 2, 20, '{"tips": ["Choose quality sources", "Take notes", "Apply insights"], "duration": 20}'),
('Physical Exercise', 'Regular physical activity to maintain energy and focus', 'wellness', ARRAY['executive', 'entrepreneur', 'sales-leader'], 1, 15, '{"tips": ["Schedule consistently", "Start small", "Track progress"], "duration": 30}'),
('Network Building', 'Connect with industry contacts and build relationships', 'productivity', ARRAY['sales-leader', 'entrepreneur'], 2, 25, '{"tips": ["Quality over quantity", "Follow up promptly", "Provide value first"], "duration": 20}'),
('Financial Review', 'Review key financial metrics and performance indicators', 'strategic', ARRAY['executive', 'entrepreneur'], 3, 30, '{"tips": ["Focus on leading indicators", "Compare to targets", "Identify trends"], "duration": 25}'),
('Innovation Time', 'Dedicated time for creative thinking and innovation', 'mindset', ARRAY['entrepreneur', 'executive'], 2, 25, '{"tips": ["Eliminate distractions", "Explore wild ideas", "Document insights"], "duration": 30}'),
('Client Relationship Review', 'Assess and strengthen key client relationships', 'leadership', ARRAY['sales-leader', 'executive'], 2, 20, '{"tips": ["Review satisfaction scores", "Plan touch points", "Address concerns"], "duration": 20}');

-- Insert default achievements
INSERT INTO public.achievements (name, description, badge_icon, requirements, points_reward) VALUES
('First Steps', 'Complete your first habit', '🎯', '{"habits_completed": 1}', 50),
('Week Warrior', 'Complete habits for 7 consecutive days', '🔥', '{"streak_days": 7}', 100),
('Consistency Champion', 'Complete habits for 30 consecutive days', '💪', '{"streak_days": 30}', 250),
('Strategic Thinker', 'Complete 10 strategic category habits', '🧠', '{"category_count": {"strategic": 10}}', 150),
('Leadership Legend', 'Complete 10 leadership category habits', '👑', '{"category_count": {"leadership": 10}}', 150),
('Mindset Master', 'Complete 10 mindset category habits', '🧘', '{"category_count": {"mindset": 10}}', 150),
('Point Collector', 'Earn 1000 total points', '⭐', '{"total_points": 1000}', 200),
('Habit Starter', 'Add 5 habits to your routine', '🚀', '{"active_habits": 5}', 75);

-- Insert default scenarios
INSERT INTO public.scenarios (title, description, category, target_roles, difficulty_level, content, estimated_duration, is_premium) VALUES
('Difficult Client Negotiation', 'Navigate a challenging negotiation with a key client who is threatening to leave', 'negotiation', ARRAY['sales-leader', 'executive'], 4, '{"scenario": "Your biggest client is unhappy with recent service and threatening to cancel their contract. They want significant concessions.", "objectives": ["Retain the client", "Minimize concessions", "Strengthen relationship"], "tools": ["Active listening", "Value reinforcement", "Creative solutions"], "success_metrics": ["Client retention", "Profit margin maintained", "Future opportunity identified"]}', 25, true),
('Team Productivity Crisis', 'Address declining team performance and motivation issues', 'leadership', ARRAY['executive', 'sales-leader'], 3, '{"scenario": "Your team''s productivity has dropped 30% over the past month. Morale is low and deadlines are being missed.", "objectives": ["Identify root causes", "Restore team motivation", "Implement improvement plan"], "tools": ["One-on-one meetings", "Team feedback sessions", "Process analysis"], "success_metrics": ["Productivity improvement", "Employee satisfaction", "Goal achievement"]}', 30, false),
('Market Entry Strategy', 'Develop a plan to enter a new competitive market', 'strategy', ARRAY['entrepreneur', 'executive'], 5, '{"scenario": "Your company wants to expand into a new market dominated by established competitors with deep pockets.", "objectives": ["Identify market opportunity", "Develop differentiation strategy", "Plan resource allocation"], "tools": ["Market analysis", "Competitive research", "Risk assessment"], "success_metrics": ["Market share capture", "ROI achievement", "Brand recognition"]}', 40, true),
('Crisis Communication', 'Manage communication during a company crisis', 'communication', ARRAY['executive'], 4, '{"scenario": "A major product defect has been discovered that could impact customer safety and company reputation.", "objectives": ["Protect customer safety", "Maintain stakeholder trust", "Minimize reputational damage"], "tools": ["Stakeholder mapping", "Message framing", "Media strategy"], "success_metrics": ["Public trust maintained", "Media coverage tone", "Customer retention"]}', 35, true),
('Sales Team Motivation', 'Energize a struggling sales team to meet quarterly targets', 'leadership', ARRAY['sales-leader'], 2, '{"scenario": "Your sales team is 40% behind on quarterly targets with 6 weeks remaining. Team morale is low after losing several big deals.", "objectives": ["Boost team confidence", "Accelerate deal closure", "Meet quarterly targets"], "tools": ["Performance coaching", "Incentive programs", "Process optimization"], "success_metrics": ["Deal acceleration", "Team engagement", "Target achievement"]}', 20, false);

-- Create function to calculate streaks
CREATE OR REPLACE FUNCTION public.calculate_user_streak(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
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

-- Create function to update user progress
CREATE OR REPLACE FUNCTION public.update_user_progress(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
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