"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Brain } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import ChatInterface from "@/components/chat-interface"

export default function ChatPage() {
  const params = useParams()
  const { user } = useAuth()
  const userId = params.userId as string

  // Mock user data - in real app, fetch based on userId
  const chatUser = {
    name: "John Doe",
    role: user?.role === "applicant" ? "HR Manager" : "Software Developer",
    title: user?.role === "applicant" ? "TechCorp Inc." : "Senior Developer",
    isVerified: true,
    profileImage: "/placeholder.svg?height=40&width=40",
  }

  const backUrl = user?.role === "applicant" ? "/dashboard/applicant" : "/dashboard/employer"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link href={backUrl}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">TalentAI</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-lg font-medium">Chat</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ChatInterface
          recipientName={chatUser.name}
          recipientRole={chatUser.role}
          recipientTitle={chatUser.title}
          isVerified={chatUser.isVerified}
          profileImage={chatUser.profileImage}
        />
      </div>
    </div>
  )
}
