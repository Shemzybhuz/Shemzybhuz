"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { updateAdminSettings } from "@/lib/admin-settings"

export default function AdminSettingsPage() {
  const [adminPhone, setAdminPhone] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Get the current settings from environment variables
    setAdminPhone(process.env.NEXT_PUBLIC_ADMIN_PHONE || "")
    setAdminEmail(process.env.NEXT_PUBLIC_ADMIN_EMAIL || "")
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateAdminSettings({
        adminPhone,
        adminEmail,
      })

      setIsSaved(true)
      toast({
        title: "Settings updated",
        description: "Your admin contact information has been updated successfully.",
      })

      // Reset the saved state after 3 seconds
      setTimeout(() => setIsSaved(false), 3000)
    } catch (error) {
      console.error("Failed to update settings:", error)
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Admin Settings</CardTitle>
          <CardDescription>
            Update your contact information for notifications and client communications.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminPhone">Phone Number</Label>
              <Input
                id="adminPhone"
                value={adminPhone}
                onChange={(e) => setAdminPhone(e.target.value)}
                placeholder="+1234567890"
              />
              <p className="text-sm text-muted-foreground">
                This number will receive SMS notifications for new bookings.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email Address</Label>
              <Input
                id="adminEmail"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@example.com"
                type="email"
              />
              <p className="text-sm text-muted-foreground">
                This email will receive email notifications for new bookings.
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isLoading || isSaved} className="w-full sm:w-auto">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaved && <Check className="mr-2 h-4 w-4" />}
              {isLoading ? "Saving..." : isSaved ? "Saved" : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
