"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard } from "lucide-react"

interface PayPalSubscriptionProps {
  userType: "applicant" | "employer"
  onSubscriptionComplete?: () => void
}

export default function PayPalSubscription({ userType, onSubscriptionComplete }: PayPalSubscriptionProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const planDetails = {
    applicant: {
      price: "€5",
      title: "Applicant Plan",
      features: [
        "AI-powered job matching",
        "Professional profile generation",
        "Skills and IQ assessments",
        "Identity verification",
        "Direct employer chat",
      ],
    },
    employer: {
      price: "€50",
      title: "Employer Plan",
      features: [
        "AI candidate filtering",
        "Unlimited job postings",
        "Detailed candidate profiles",
        "Company verification",
        "Direct candidate chat",
        "Advanced analytics",
      ],
    },
  }

  const currentPlan = planDetails[userType]

  const handleSubscribe = async () => {
    setIsProcessing(true)
    // Simulate PayPal integration
    setTimeout(() => {
      setIsProcessing(false)
      onSubscriptionComplete?.()
    }, 2000)
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <Badge className="w-fit mx-auto mb-2">{userType === "applicant" ? "For Job Seekers" : "For Employers"}</Badge>
        <CardTitle className="text-2xl">{currentPlan.title}</CardTitle>
        <CardDescription>
          {userType === "applicant"
            ? "Everything you need to find your dream job"
            : "Find and hire the best talent efficiently"}
        </CardDescription>
        <div className="text-3xl font-bold">
          {currentPlan.price}
          <span className="text-lg font-normal">/month</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {currentPlan.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={handleSubscribe} disabled={isProcessing}>
          <CreditCard className="mr-2 h-4 w-4" />
          {isProcessing ? "Processing..." : "Subscribe with PayPal"}
        </Button>
        <p className="text-xs text-gray-600 text-center">Secure payment powered by PayPal. Cancel anytime.</p>
      </CardContent>
    </Card>
  )
}
