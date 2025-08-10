"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ApplicantSignIn() {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignIn = async () => {
    const identifier = loginMethod === "email" ? formData.email : formData.phone

    if (!identifier || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Explicitly pass "applicant" role
      console.log("Attempting applicant login for:", identifier) // Debug log
      await login(identifier, formData.password, "applicant")

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in as a job seeker.",
      })

      // Force redirect to applicant dashboard
      router.push("/dashboard/applicant")
      router.refresh() // Ensure page refreshes to reflect new auth state
    } catch (error) {
      console.error("Applicant login error:", error) // Debug log
      toast({
        title: "Sign In Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignIn()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <User className="h-6 w-6 text-blue-600" />
            <span>Job Seeker Sign In</span>
          </CardTitle>
          <CardDescription>Access your job seeker dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "email" | "phone")} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="phone">
                <Phone className="mr-2 h-4 w-4" />
                Phone
              </TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </TabsContent>
            <TabsContent value="phone" className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSignIn} disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In as Job Seeker"}
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/applicant/signup" className="text-blue-600 hover:underline font-medium">
              Sign up as job seeker
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Hiring talent?{" "}
            <Link href="/auth/employer/signin" className="text-purple-600 hover:underline font-medium">
              Sign in as employer
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
