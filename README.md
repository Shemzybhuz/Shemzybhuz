# Blessing Signature Salon

A professional, fully responsive salon booking website for Blessing Signature Salon, located in Oyo State, Nigeria. Built with Next.js, featuring a modern booking system with SMS client notifications and a clean user interface.

## Features

- ✅ Modern, fully responsive design (mobile, tablet, desktop)
- ✅ Professional online booking system
- ✅ Real-time client phone number notifications
- ✅ Service showcase with pricing in Nigerian Naira (₦)
- ✅ Testimonials section
- ✅ Gallery showcase
- ✅ Google Maps integration for location
- ✅ WhatsApp and contact widgets
- ✅ About Us and Contact pages
- ✅ Clean, maintainable codebase

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blessing-signature-salon
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file with:
```
NEXT_PUBLIC_ADMIN_PHONE=+2348026705191
NEXT_PUBLIC_ADMIN_EMAIL=admin@blessingsignature.com
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /api
    /bookings - Booking submission API
  /admin - Admin dashboard (future enhancement)
  layout.tsx - Root layout
  page.tsx - Home page
  /services - Services page
  /booking - Booking page
  /gallery - Gallery page
  /contact - Contact page
  /about - About page

/components
  booking-form.tsx - Main booking form
  contact-section.tsx - Contact information
  - UI components in /components/ui

/lib
  booking-client.ts - Client booking utilities
  booking-service.ts - Server-side booking logic
  notification.ts - Notification utilities

/public
  - Static assets (images, favicon)

/supabase
  - Database functions (future)
```

## Booking System

The booking form collects:
- **Client Name** (required)
- **Client Email** (optional)
- **Client Phone** (required) - Used for SMS confirmation
- **Service** (required)
- **Date** (required)
- **Time** (required)
- **Notes** (optional)
- **Preferred Contact Method** (SMS or WhatsApp)

### How It Works

1. Customer submits booking form with their phone number
2. Form validates required fields
3. Booking is sent to `/api/bookings` endpoint
4. System logs the booking (future: saves to database)
5. SMS confirmation sent to client's phone number

## Customization

### Update Contact Information

Edit environment variables in Vercel dashboard:
- `NEXT_PUBLIC_ADMIN_PHONE` - Your salon's phone number
- `NEXT_PUBLIC_ADMIN_EMAIL` - Your salon's email

### Update Services and Pricing

Edit services list in `/components/booking-form.tsx`:
```typescript
const services = [
  "Hair Treatment",
  "Hair Styling",
  "Nail Care",
  // Add more services
]
```

### Update Salon Information

Update brand name and details throughout:
- `/app/layout.tsx` - Page titles and metadata
- `/components/layout/header.tsx` - Header content
- `/components/layout/footer.tsx` - Footer content
- Various page components

## Performance Optimizations

- Server-side rendering where possible
- Image optimization
- Component code splitting
- Responsive design for all devices
- Mobile-first approach

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_ADMIN_PHONE`
   - `NEXT_PUBLIC_ADMIN_EMAIL`
4. Deploy

### Deploy to Other Platforms

The application can be deployed to any platform supporting Node.js:
- Netlify
- Firebase Hosting
- AWS Amplify
- DigitalOcean
- Railway

## Future Enhancements

- Database integration (Supabase/MongoDB)
- Admin dashboard for booking management
- Email confirmations
- Booking cancellation/rescheduling
- Staff profiles and scheduling
- Payment integration
- Customer reviews system
- Appointment reminders

## Troubleshooting

### Booking form not submitting

1. Check browser console for errors (F12)
2. Verify environment variables are set correctly
3. Ensure API route `/api/bookings` is working

### Styling issues

1. Check that Tailwind CSS is properly configured
2. Clear browser cache (Ctrl+Shift+Delete)
3. Restart development server

### Phone number format

- Always include country code (e.g., +234...)
- Format example: +2348026705191

## Support

For issues or questions, check:
1. Browser console for error messages
2. Network tab in DevTools
3. Environment variables configuration
4. File paths and imports

## License

This project is proprietary to Blessing Signature Salon.
