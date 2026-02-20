import { getAdminSettings } from "@/lib/admin-settings"
import { createClient } from "@/lib/supabase-server"

export async function sendAdminNotification(booking: any) {
  try {
    // Send email notification to admin
    const emailResult = await sendAdminEmailNotification(booking)

    // Send SMS notification to admin
    const smsResult = await sendAdminSMSNotification(booking)

    return {
      success: emailResult.success || smsResult.success,
      message: `Admin notifications: ${emailResult.message}, ${smsResult.message}`,
    }
  } catch (error) {
    console.error("Error sending admin notifications:", error)
    return { success: false, message: "Failed to send admin notifications" }
  }
}

export async function sendClientNotification(booking: any) {
  try {
    // Only send SMS notification to client
    const result = await sendClientSMSNotification(booking)

    return result
  } catch (error) {
    console.error("Error sending client notification:", error)
    return { success: false, message: "Failed to send client notification" }
  }
}

export async function sendAdminEmailNotification(booking: any) {
  try {
    const settings = await getAdminSettings()
    const adminEmail = settings.adminEmail || process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL

    if (!adminEmail) {
      console.error("Admin email not configured")
      return { success: false, message: "Admin email not configured" }
    }

    const { data, error } = await createClient().functions.invoke("send-email-notification", {
      body: {
        booking,
        adminEmail,
        template: "admin-notification",
      },
    })

    if (error) {
      console.error("Error sending admin email notification:", error)
      return { success: false, message: error.message }
    }

    return { success: true, message: "Admin email notification sent" }
  } catch (error) {
    console.error("Error sending admin email notification:", error)
    return { success: false, message: "Failed to send admin email notification" }
  }
}

export async function sendAdminSMSNotification(booking: any) {
  try {
    const settings = await getAdminSettings()
    const adminPhone = settings.adminPhone || process.env.NEXT_PUBLIC_ADMIN_PHONE || process.env.ADMIN_PHONE

    if (!adminPhone) {
      console.error("Admin phone not configured")
      return { success: false, message: "Admin phone not configured" }
    }

    const { data, error } = await createClient().functions.invoke("send-sms-notification", {
      body: {
        booking,
        phone: adminPhone,
        template: "admin-notification",
      },
    })

    if (error) {
      console.error("Error sending admin SMS notification:", error)
      return { success: false, message: error.message }
    }

    return { success: true, message: "Admin SMS notification sent" }
  } catch (error) {
    console.error("Error sending admin SMS notification:", error)
    return { success: false, message: "Failed to send admin SMS notification" }
  }
}

export async function sendClientSMSNotification(booking: any) {
  try {
    const clientPhone = booking.phone

    if (!clientPhone) {
      console.error("Client phone not provided")
      return { success: false, message: "Client phone not provided" }
    }

    const { data, error } = await createClient().functions.invoke("send-sms-notification", {
      body: {
        booking,
        phone: clientPhone,
        template: "client-confirmation",
      },
    })

    if (error) {
      console.error("Error sending client SMS notification:", error)
      return { success: false, message: error.message }
    }

    return { success: true, message: "Client SMS notification sent" }
  } catch (error) {
    console.error("Error sending client SMS notification:", error)
    return { success: false, message: "Failed to send client SMS notification" }
  }
}
