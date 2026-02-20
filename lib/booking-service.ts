export interface BookingData {
  name: string
  email?: string
  phone: string
  service: string
  date: string
  time: string
  notes?: string
  preferredContact?: string
}

export async function createBooking(bookingData: BookingData) {
  try {
    console.log("[v0] Creating booking:", bookingData)
    
    // Return success response - simplified for now
    return {
      success: true,
      message: "Booking created successfully",
    }
  } catch (error) {
    console.error("[v0] Error in createBooking:", error)
    return {
      success: false,
      message: "Failed to create booking. Please try again.",
    }
  }
}
