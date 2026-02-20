import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { Twilio } from "https://esm.sh/twilio@4.8.0"

serve(async (req) => {
  try {
    const { booking, phone, template = "admin-notification" } = await req.json()

    // Get Twilio credentials from environment variables
    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID")
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN")
    const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER")

    if (!accountSid || !authToken || !twilioPhone) {
      return new Response(JSON.stringify({ success: false, error: "Twilio credentials not configured" }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      })
    }

    if (!phone) {
      return new Response(JSON.stringify({ success: false, error: "Phone number not provided" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      })
    }

    // Format the message based on template
    let message = ""

    if (template === "admin-notification") {
      message = `
        New booking from ${booking.name}!
        
        Service: ${booking.service}
        Date: ${new Date(booking.date).toLocaleDateString()}
        Time: ${booking.time}
        Phone: ${booking.phone}
        Email: ${booking.email}
      `.trim()
    } else if (template === "client-confirmation") {
      message = `
        Thank you for booking with Blessing Signature!
        
        Your appointment details:
        Service: ${booking.service}
        Date: ${new Date(booking.date).toLocaleDateString()}
        Time: ${booking.time}
        
        We look forward to seeing you!
        If you need to reschedule, please call us.
      `.trim()
    }

    // Initialize Twilio client
    const client = new Twilio(accountSid, authToken)

    // Send SMS
    const result = await client.messages.create({
      body: message,
      to: phone,
      from: twilioPhone,
    })

    return new Response(JSON.stringify({ success: true, messageId: result.sid }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})
