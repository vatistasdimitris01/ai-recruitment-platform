"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function EmployerSignIn() {
  const [formData, setFormData] = useState({
    email: "",
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
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Explicitly pass "employer" role
      console.log("Attempting employer login for:", formData.email) // Debug log
      await login(formData.email, formData.password, "employer")

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in as an employer.",
      })

      // Force redirect to employer dashboard
      router.push("/dashboard/employer")
      router.refresh() // Ensure page refreshes to reflect new auth state
    } catch (error) {
      console.error("Employer login error:", error) // Debug log
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <Building2 className="h-6 w-6 text-purple-600" />
            <span>Employer Sign In</span>
          </CardTitle>
          <CardDescription>Access your employer dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="hr@company.com"
                required
              />
            </div>
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
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleSignIn} disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In as Employer"}
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/employer/signup" className="text-purple-600 hover:underline font-medium">
              Sign up as employer
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Looking for jobs?{" "}
            <Link href="/auth/applicant/signin" className="text-blue-600 hover:underline font-medium">
              Sign in as job seeker
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
