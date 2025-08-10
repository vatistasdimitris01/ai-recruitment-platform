import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building2, Brain, Shield, MessageSquare, Star, Zap, Target, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TalentAI
            </span>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <Link href="/auth/applicant/signin">
              <Button variant="ghost" size="sm" className="text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/applicant/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 sm:mb-6 bg-blue-100 text-blue-700 border-blue-200">
            <Zap className="mr-1 h-3 w-3" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            AI-Powered Recruitment Platform
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Connect talent with opportunity using advanced AI matching, comprehensive skills assessment, and verified
            profiles. Experience the future of recruitment today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <Link href="/auth/applicant/signup">
              <Button
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Find Your Dream Job
              </Button>
            </Link>
            <Link href="/auth/employer/signup">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 hover:bg-gray-50 bg-transparent"
              >
                <Building2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Hire Top Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Intelligent Recruitment Features
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Leverage cutting-edge AI technology to streamline your hiring process
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">AI-Powered Matching</CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                Advanced algorithms analyze skills, experience, and personality to find perfect matches
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Identity Verification</CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                Selfie liveness detection and optional ID verification ensure authentic profiles
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Comprehensive Assessment</CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                AI-generated quizzes combining IQ tests and skills evaluation from CV analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Smart Communication</CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                In-app chat with text and image sharing for seamless employer-candidate interaction
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Precision Filtering</CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                Set specific requirements for IQ, skills, experience, and let AI find the best candidates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Star Rating System</CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                Composite scoring system (1-10 stars) based on assessments, CV quality, and verification
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How TalentAI Works</h2>
            <p className="text-lg sm:text-xl text-gray-600">Simple steps to connect talent with opportunity</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            {/* For Job Seekers */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6 sm:mb-8 text-center">For Job Seekers</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Create Your Profile</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Sign up with email/phone and complete identity verification
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Upload & Analyze CV</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      AI extracts skills, experience, and generates your professional profile
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Complete Assessment</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Take AI-generated quiz combining IQ and skills evaluation
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Get Matched</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Receive AI-ranked job opportunities and connect with employers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Employers */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-600 mb-6 sm:mb-8 text-center">For Employers</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Company Setup</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Create company profile with verification and job requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Post Jobs</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Create job listings manually or with AI assistance
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">AI Filtering</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Set criteria and let AI shortlist the best candidates
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Connect & Hire</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Review detailed profiles and communicate with top candidates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Recruitment?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of companies and job seekers who trust TalentAI for their recruitment needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Link href="/auth/applicant/signup">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              >
                Start as Job Seeker
              </Button>
            </Link>
            <Link href="/auth/employer/signup">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                Start as Employer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-lg sm:text-xl font-bold">TalentAI</span>
            </div>
            <div className="text-gray-400 text-center sm:text-right">
              <p className="text-sm sm:text-base">© 2024 TalentAI. All rights reserved.</p>
              <p className="text-xs sm:text-sm mt-1">Powered by Advanced AI Technology</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
