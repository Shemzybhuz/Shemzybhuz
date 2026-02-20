import { createClient } from "@/lib/supabase-server"
import { sendAdminNotification, sendClientNotification } from "@/lib/notification"

export interface BookingData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  notes?: string
}

export async function createBooking(bookingData: BookingData) {
  try {
    const supabase = createClient()

    // Insert booking into database
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          service: bookingData.service,
          date: bookingData.date,
          time: bookingData.time,
          notes: bookingData.notes || "",
          status: "pending",
        },
      ])
      .select()

    if (error) {
      console.error("Error creating booking:", error)
      return { success: false, message: error.message }
    }

    const booking = data[0]

    // Send notification to admin
    await sendAdminNotification(booking)

    // Send confirmation to client
    await sendClientNotification(booking)

    return {
      success: true,
      message: "Booking created successfully",
      booking,
    }
  } catch (error) {
    console.error("Error in createBooking:", error)
    return {
      success: false,
      message: "Failed to create booking. Please try again.",
    }
  }
}

export async function getBookings() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("bookings").select("*").order("date", { ascending: true })

    if (error) {
      console.error("Error fetching bookings:", error)
      return { success: false, message: error.message }
    }

    return { success: true, bookings: data }
  } catch (error) {
    console.error("Error in getBookings:", error)
    return {
      success: false,
      message: "Failed to fetch bookings. Please try again.",
    }
  }
}

export async function updateBookingStatus(id: number, status: string) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("bookings").update({ status }).eq("id", id).select()

    if (error) {
      console.error("Error updating booking status:", error)
      return { success: false, message: error.message }
    }

    return {
      success: true,
      message: "Booking status updated successfully",
      booking: data[0],
    }
  } catch (error) {
    console.error("Error in updateBookingStatus:", error)
    return {
      success: false,
      message: "Failed to update booking status. Please try again.",
    }
  }
}
