"use client"

import type { BookingData } from "@/lib/booking-service"

export async function createBooking(bookingData: BookingData) {
  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      let errorMessage = "Failed to create booking"
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch (e) {
        // Response wasn't JSON, use default message
      }
      return {
        success: false,
        message: errorMessage,
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Error in createBooking client:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}
