import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { SMTPClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

serve(async (req) => {
  try {
    const { booking, adminEmail, template = "admin-notification" } = await req.json()

    // Get email credentials from environment variables
    const gmailUser = Deno.env.get("GMAIL_USER")
    const gmailPass = Deno.env.get("GMAIL_PASSWORD")

    if (!gmailUser || !gmailPass) {
      return new Response(JSON.stringify({ success: false, error: "Email credentials not configured" }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
      })
    }

    if (!adminEmail) {
      return new Response(JSON.stringify({ success: false, error: "Admin email not provided" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      })
    }

    // Initialize SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: gmailUser,
          password: gmailPass,
        },
      },
    })

    // Format the email based on template
    let emailContent = ""
    let subject = ""

    if (template === "admin-notification") {
      subject = `New Booking from ${booking.name}`
      emailContent = `
        <h1>New Booking Notification</h1>
        <p>You have received a new booking from <strong>${booking.name}</strong>.</p>
        
        <h2>Booking Details:</h2>
        <ul>
          <li><strong>Service:</strong> ${booking.service}</li>
          <li><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${booking.time}</li>
          <li><strong>Phone:</strong> ${booking.phone}</li>
          <li><strong>Email:</strong> ${booking.email}</li>
        </ul>
        
        <p>You can view all bookings in your <a href="https://your-salon-website.com/admin/bookings">admin dashboard</a>.</p>
      `
    }

    // Send email
    await client.send({
      from: gmailUser,
      to: adminEmail,
      subject: subject,
      content: "text/html",
      html: emailContent,
    })

    await client.close()

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})
