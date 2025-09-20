-- Fix security warnings
-- 1. Drop the unsafe function and create a simpler approach
DROP FUNCTION IF EXISTS create_demo_account();

-- 2. Create an edge function to safely create demo account instead
-- This will be handled via the normal Supabase signup process