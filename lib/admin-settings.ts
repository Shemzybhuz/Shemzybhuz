import { createClient } from "@/lib/supabase-server"

interface AdminSettings {
  adminPhone: string
  adminEmail: string
}

export async function updateAdminSettings(settings: AdminSettings) {
  const supabase = createClient()

  // Update the settings in the Supabase database
  const { error } = await supabase.from("admin_settings").upsert({
    id: 1, // Single row for admin settings
    admin_phone: settings.adminPhone,
    admin_email: settings.adminEmail,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error updating admin settings:", error)
    throw new Error("Failed to update admin settings")
  }

  // Update the local environment variables
  if (typeof window !== "undefined") {
    window.localStorage.setItem("NEXT_PUBLIC_ADMIN_PHONE", settings.adminPhone)
    window.localStorage.setItem("NEXT_PUBLIC_ADMIN_EMAIL", settings.adminEmail)
  }

  return settings
}

export async function getAdminSettings(): Promise<AdminSettings> {
  const supabase = createClient()

  // Try to get settings from Supabase
  const { data, error } = await supabase.from("admin_settings").select("*").eq("id", 1).single()

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching admin settings:", error)
  }

  // Fallback to environment variables if no data in database
  return {
    adminPhone: data?.admin_phone || process.env.NEXT_PUBLIC_ADMIN_PHONE || "",
    adminEmail: data?.admin_email || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "",
  }
}
