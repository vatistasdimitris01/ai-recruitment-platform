"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building2, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import SelfieVerification from "@/components/selfie-verification"

export default function EmployerSignUp() {
  const [step, setStep] = useState(1)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactName: "",
    jobTitle: "",
  })
  const [verificationStatus, setVerificationStatus] = useState({
    selfie: false,
    companyId: false,
  })

  const { register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSelfieCapture = async () => {
    setIsVerifying(true)
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

  const handleCompanyIdUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setVerificationStatus((prev) => ({ ...prev, companyId: true }))
      toast({
        title: "Company Verification Complete",
        description: "Your company documents have been processed and verified.",
      })
    }, 2000)
  }

  const handleCompleteRegistration = async () => {
    try {
      await register({
        ...formData,
        role: "employer",
        verificationStatus,
      })

      toast({
        title: "Registration Successful",
        description: "Welcome to TalentAI! Please complete your company profile.",
      })

      router.push("/dashboard/employer/company-setup")
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const validateStep1 = () => {
    if (!formData.companyName || !formData.contactName || !formData.jobTitle) return false
    if (!formData.email || !formData.password) return false
    if (formData.password !== formData.confirmPassword) return false
    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <Building2 className="h-6 w-6 text-purple-600" />
            <span>Join as Employer</span>
          </CardTitle>
          <CardDescription>Create your account to find top talent</CardDescription>

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
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Your Company Ltd."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="jobTitle">Your Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    placeholder="HR Manager"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Business Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="hr@company.com"
                />
              </div>

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

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Building2 className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">Optional: Company ID Verification</h3>
                <p className="text-sm text-gray-600">
                  Upload company registration documents for additional verification. This is optional but helps build
                  trust with candidates.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleCompanyIdUpload}
                    className="hidden"
                    id="company-id-upload"
                    disabled={isUploading}
                  />
                  <label htmlFor="company-id-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-sm font-medium">
                        {isUploading ? "Processing..." : "Upload Company Documents"}
                      </p>
                      <p className="text-xs text-gray-500">Business License, Registration Certificate, etc.</p>
                    </div>
                  </label>
                </div>

                {verificationStatus.companyId && (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Company Documents Verified</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Button className="w-full" onClick={handleCompleteRegistration} size="lg">
                    Complete Registration
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleCompleteRegistration}>
                    Skip Company Verification & Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/employer/signin" className="text-purple-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
