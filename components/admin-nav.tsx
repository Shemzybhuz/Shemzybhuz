"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, Settings } from "lucide-react"

export function AdminNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/admin"
        className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
          isActive("/admin") && !isActive("/admin/bookings") && !isActive("/admin/settings")
            ? "text-primary"
            : "text-muted-foreground"
        }`}
      >
        <Home className="mr-2 h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/admin/bookings"
        className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
          isActive("/admin/bookings") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Calendar className="mr-2 h-4 w-4" />
        Bookings
      </Link>
      <Link
        href="/admin/settings"
        className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
          isActive("/admin/settings") ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Link>
    </nav>
  )
}
