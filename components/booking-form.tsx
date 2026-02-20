"use client"

import type React from "react"
import { useState } from "react"
import { createBooking } from "@/lib/booking-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

const services = [
  "Hair Treatment",
  "Hair Styling",
  "Nail Care",
  "Facial",
  "Body Treatment",
  "Massage",
]

export default function BookingForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
    preferredContact: "sms",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage("")

    // Validate form data
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      console.log("[v0] Submitting booking with data:", formData)
      
      const result = await createBooking(formData)

      if (result.success) {
        setSuccessMessage(
          `Booking confirmed! A ${formData.preferredContact === "sms" ? "SMS" : "WhatsApp"} confirmation has been sent to ${formData.phone}.`
        )
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
          notes: "",
          preferredContact: "sms",
        })

        toast({
          title: "Booking Confirmed",
          description: `Your appointment is scheduled for ${formData.date} at ${formData.time}`,
        })

        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(""), 5000)
      } else {
        toast({
          title: "Booking Failed",
          description: result.message || "Failed to create booking",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error submitting booking:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Book Your Appointment</CardTitle>
          <CardDescription>
            Schedule your visit at Blessing Signature Salon
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {successMessage && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {successMessage}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number * (e.g., +234...)</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+2348026705191"
                required
              />
              <p className="text-sm text-muted-foreground">
                We'll send your booking confirmation to this number.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service * </Label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md"
                required
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time *</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special requests or information..."
                className="h-20"
              />
            </div>

            <div className="space-y-3">
              <Label>Preferred Contact Method</Label>
              <RadioGroup value={formData.preferredContact} onValueChange={(value) => setFormData({ ...formData, preferredContact: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms" className="font-normal cursor-pointer">
                    SMS
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whatsapp" id="whatsapp" />
                  <Label htmlFor="whatsapp" className="font-normal cursor-pointer">
                    WhatsApp
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Processing..." : "Confirm Booking"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
