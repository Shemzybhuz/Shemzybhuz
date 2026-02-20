-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id SERIAL PRIMARY KEY,
  admin_phone TEXT,
  admin_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default values
INSERT INTO admin_settings (id, admin_phone, admin_email)
VALUES (1, '+2348026705191', 'admin@example.com')
ON CONFLICT (id) DO NOTHING;

-- Add RLS policies
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for admin users
CREATE POLICY "Admin users can read and update admin settings"
  ON admin_settings
  USING (TRUE)
  WITH CHECK (TRUE);
