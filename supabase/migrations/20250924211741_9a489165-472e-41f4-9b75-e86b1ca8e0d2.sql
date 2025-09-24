-- Update tier constraint to include 'premium' for demo account
ALTER TABLE profiles DROP CONSTRAINT profiles_tier_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_tier_check 
  CHECK (tier = ANY (ARRAY['trial'::text, 'personal'::text, 'professional'::text, 'premium'::text]));

-- Now update demo account to have premium tier for full access
UPDATE profiles 
SET tier = 'premium' 
WHERE email = 'demo@apexexecutive.com';

-- Also ensure the demo account has sample data and progress
INSERT INTO user_progress (user_id, total_points, current_streak, longest_streak, habits_completed_today, habits_completed_this_week, confidence_level)
SELECT user_id, 150, 7, 15, 3, 12, 95
FROM profiles 
WHERE email = 'demo@apexexecutive.com'
ON CONFLICT (user_id) DO UPDATE SET
  total_points = 150,
  current_streak = 7,
  longest_streak = 15,
  habits_completed_today = 3,
  habits_completed_this_week = 12,
  confidence_level = 95;