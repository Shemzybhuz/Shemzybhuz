import { type NextRequest, NextResponse } from "next/server"
import { createBooking } from "@/lib/booking-service"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Received booking POST request")
    const bookingData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "phone", "service", "date", "time"]
    const missingFields = requiredFields.filter((field) => !bookingData[field])
    
    if (missingFields.length > 0) {
      console.log("[v0] Missing fields:", missingFields)
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      )
    }

    console.log("[v0] Booking data validated, creating booking...")
    
    // Create booking
    const result = await createBooking(bookingData)

    if (!result.success) {
      console.log("[v0] Booking creation failed:", result.message)
      return NextResponse.json({ success: false, message: result.message }, { status: 500 })
    }

    console.log("[v0] Booking created successfully")
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("[v0] Error in POST /api/bookings:", error)
    const errorMessage = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
  }
}
