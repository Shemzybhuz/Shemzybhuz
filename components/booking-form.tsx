# Blessing Signature Salon

A professional salon booking website for Blessing Signature Salon, located in Oyo State, Nigeria.

## Features

- Modern, responsive design
- Online booking system with client SMS confirmations
- Service showcase
- Admin dashboard for booking management
- Email and SMS notifications for both clients and admin
- Google Maps integration

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email notifications (Gmail)
GMAIL_USER=your_gmail_account
GMAIL_PASSWORD=your_gmail_app_password

# SMS notifications (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Admin contact info
ADMIN_EMAIL=admin_email@example.com
ADMIN_PHONE=+2348026705191
NEXT_PUBLIC_ADMIN_EMAIL=admin_email@example.com
NEXT_PUBLIC_ADMIN_PHONE=+2348026705191
\`\`\`

### 2. Database Setup

Run the SQL migrations in the `/migrations` folder in your Supabase SQL editor to set up the necessary tables.

### 3. Supabase Edge Functions

The project uses Supabase Edge Functions for email and SMS notifications. Deploy these functions using the Supabase CLI:

\`\`\`
cd supabase/functions
supabase functions deploy
\`\`\`

### 4. Update Admin Information

After setting up the project, you can update your admin phone number and email:

1. Log in to the admin dashboard
2. Go to Settings
3. Update your phone number and email address
4. Save changes

## Development

\`\`\`
npm install
npm run dev
\`\`\`

## Production Build

\`\`\`
npm run build
npm start
\`\`\`

## Notification System

The booking system sends notifications to both the salon admin and the client:

1. **Admin Notifications:**
   - Email notification with booking details
   - SMS notification with booking details

2. **Client Notifications:**
   - SMS confirmation with appointment details
   - The client's phone number (entered in the booking form) is used to send the confirmation

## Updating Admin Settings

You can update your admin contact information in two ways:

1. **Through the Admin Dashboard:**
   - Navigate to `/admin/settings`
   - Update your phone number and email
   - Save changes

2. **Through Environment Variables:**
   - Update `ADMIN_PHONE` and `ADMIN_EMAIL` in your `.env.local` file
   - Restart the application

## Troubleshooting

If you encounter issues with notifications:

1. Ensure all environment variables are correctly set
2. Check that Supabase Edge Functions are properly deployed
3. Verify your Gmail and Twilio credentials
4. Check the phone number format (must include country code, e.g., +2348026705191)
5. Make sure the client's phone number is entered correctly in the booking form
