-- Drop the insecure function and create a secure demo account edge function instead
DROP FUNCTION IF EXISTS create_demo_account();

-- Note: We'll create the demo account through the standard auth flow instead
-- This is more secure and follows Supabase best practices