"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Mail, Phone, Upload, User, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import SelfieVerification from "@/components/selfie-verification"

export default function ApplicantSignUp() {
  const [step, setStep] = useState(1)
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })
  const [verificationStatus, setVerificationStatus] = useState({
    selfie: false,
    idDocument: false,
  })

  const { register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSelfieCapture = async () => {
    setIsVerifying(true)
    // Simulate selfie liveness detection
    setTimeout(() => {
      setIsVerifying(false)
      setVerificationStatus((prev) => ({ ...prev, selfie: true }))
      toast({
        title: "Verification Successful",
        description: "Your identity has been verified successfully.",
      })
      setStep(3)
    }, 3000)
  }

  const handleIdUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    // Simulate OCR processing
    setTimeout(() => {
      setIsUploading(false)
      setVerificationStatus((prev) => ({ ...prev, idDocument: true }))
      toast({
        title: "ID Verification Complete",
        description: "Your government ID has been processed and verified.",
      })
    }, 2000)
  }

  const handleCompleteRegistration = async () => {
    try {
      await register({
        ...formData,
        role: "applicant",
        verificationStatus,
        signupMethod,
      })

      toast({
        title: "Registration Successful",
        description: "Welcome to TalentAI! Please complete your profile.",
      })

      router.push("/dashboard/applicant/profile-setup")
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName) return false
    if (signupMethod === "email" && !formData.email) return false
    if (signupMethod === "phone" && !formData.phone) return false
    if (!formData.password || formData.password !== formData.confirmPassword) return false
    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <User className="h-6 w-6 text-blue-600" />
            <span>Join as Job Seeker</span>
          </CardTitle>
          <CardDescription>Create your account to find amazing opportunities</CardDescription>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            <Badge
              variant={step >= 1 ? "default" : "secondary"}
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
            >
              1
            </Badge>
            <Badge
              variant={step >= 2 ? "default" : "secondary"}
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
            >
              2
            </Badge>
            <Badge
              variant={step >= 3 ? "default" : "secondary"}
              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
            >
              3
            </Badge>
          </div>
          <Progress value={(step / 3) * 100} className="mt-2" />
        </CardHeader>

        <CardContent>
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <Tabs value={signupMethod} onValueChange={(v) => setSignupMethod(v as "email" | "phone")}>
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
                      placeholder="your@email.com"
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
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Create a strong password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                />
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Passwords do not match
                  </p>
                )}
              </div>

              <Button className="w-full" onClick={() => setStep(2)} disabled={!validateStep1()}>
                Continue to Verification
              </Button>
            </div>
          )}

          {/* Step 2: Selfie Verification */}
          {step === 2 && (
            <SelfieVerification
              onVerificationComplete={(result) => {
                setVerificationStatus((prev) => ({
                  ...prev,
                  selfie: result.isVerified && result.isAdult,
                }))
                if (result.isVerified && result.isAdult) {
                  setStep(3)
                }
              }}
              onError={(error) => {
                toast({
                  title: "Verification Failed",
                  description: error,
                  variant: "destructive",
                })
              }}
            />
          )}

          {/* Step 3: Optional ID Upload */}
          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">Optional: Government ID Verification</h3>
                <p className="text-sm text-gray-600">
                  Upload your government ID for additional verification. This is optional but helps increase your
                  profile credibility and match score.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleIdUpload}
                    className="hidden"
                    id="id-upload"
                    disabled={isUploading}
                  />
                  <label htmlFor="id-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-sm font-medium">{isUploading ? "Processing..." : "Upload Government ID"}</p>
                      <p className="text-xs text-gray-500">Supports: Driver's License, Passport, National ID</p>
                    </div>
                  </label>
                </div>

                {verificationStatus.idDocument && (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">ID Document Verified</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Button className="w-full" onClick={handleCompleteRegistration} size="lg">
                    Complete Registration
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleCompleteRegistration}>
                    Skip ID Upload & Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/applicant/signin" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
