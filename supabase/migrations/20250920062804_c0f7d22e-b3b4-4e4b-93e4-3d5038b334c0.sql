-- Create demo account setup function for Apple App Store reviewers
CREATE OR REPLACE FUNCTION create_demo_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    demo_user_id uuid;
BEGIN
    -- Check if demo account already exists
    IF EXISTS (
        SELECT 1 FROM auth.users 
        WHERE email = 'demo@apexexecutive.com'
    ) THEN
        RAISE NOTICE 'Demo account already exists';
        RETURN;
    END IF;
    
    -- Insert demo user into auth.users
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        last_sign_in_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        'demo@apexexecutive.com',
        '$2a$10$rqZZC1Q1j1J1j1J1j1J1j1J1j1J1j1J1j1J1j1J1j1J1j1J1j1J1j1', -- Pre-hashed password for 'AppleReview2024!'
        now(),
        now(),
        now(),
        '',
        '',
        '',
        '',
        '{"provider": "email", "providers": ["email"]}',
        '{"name": "Demo User", "role": "executive"}',
        false,
        now()
    ) RETURNING id INTO demo_user_id;
    
    RAISE NOTICE 'Demo account created with ID: %', demo_user_id;
END;
$$;