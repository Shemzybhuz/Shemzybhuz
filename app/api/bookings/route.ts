import { type NextRequest, NextResponse } from "next/server"
import { createBooking, getBookings } from "@/lib/booking-service"

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "service", "date", "time"]
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return NextResponse.json({ success: false, message: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create booking
    const result = await createBooking(bookingData)

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in POST /api/bookings:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await getBookings()

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in GET /api/bookings:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
