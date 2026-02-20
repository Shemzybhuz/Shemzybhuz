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
      const errorData = await response.json()
      return {
        success: false,
        message: errorData.message || "Failed to create booking",
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error in createBooking client:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getBookings() {
  try {
    const response = await fetch("/api/bookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        message: errorData.message || "Failed to fetch bookings",
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error in getBookings client:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function updateBookingStatus(id: number, status: string) {
  try {
    const response = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        message: errorData.message || "Failed to update booking status",
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error in updateBookingStatus client:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}
