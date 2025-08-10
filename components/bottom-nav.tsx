"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Briefcase, MessageSquare, User, Building2, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const [hasNewMessages, setHasNewMessages] = useState(true)
  const [hasNewApplications, setHasNewApplications] = useState(true)

  // Don't show navigation on auth pages, landing page, or if user is not logged in
  const hideNavigation = !user || pathname === "/" || pathname.startsWith("/auth/") || pathname.startsWith("/chat/")

  if (hideNavigation) {
    return null
  }

  const applicantNavItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/dashboard/applicant",
      hasNotification: false,
    },
    {
      icon: Briefcase,
      label: "Jobs",
      path: "/dashboard/applicant/jobs",
      hasNotification: false,
    },
    {
      icon: MessageSquare,
      label: "Messages",
      path: "/dashboard/applicant/messages",
      hasNotification: hasNewMessages,
    },
    {
      icon: User,
      label: "Profile",
      path: "/dashboard/applicant/profile",
      hasNotification: false,
    },
  ]

  const employerNavItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/dashboard/employer",
      hasNotification: false,
    },
    {
      icon: Users,
      label: "Candidates",
      path: "/dashboard/employer/candidates",
      hasNotification: hasNewApplications,
    },
    {
      icon: MessageSquare,
      label: "Messages",
      path: "/dashboard/employer/messages",
      hasNotification: hasNewMessages,
    },
    {
      icon: Building2,
      label: "Company",
      path: "/dashboard/employer/profile",
      hasNotification: false,
    },
  ]

  const navItems = user?.type === "employer" ? employerNavItems : applicantNavItems

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          const Icon = item.icon

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.hasNotification && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
