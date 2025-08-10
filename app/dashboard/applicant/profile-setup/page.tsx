"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Upload,
  FileText,
  Brain,
  CheckCircle,
  User,
  GraduationCap,
  Briefcase,
  Camera,
  Loader2,
  Star,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { analyzeCVAndGenerateQuiz, generateProfilePicture } from "@/lib/gemini"

interface CVAnalysis {
  skills: string[]
  education: string[]
  experience: string[]
  summary: string
  quiz: Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: number
    type: "iq" | "technical"
  }>
  cvRelevanceScore: number
}

export default function ProfileSetup() {
  const [step, setStep] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGeneratingPfp, setIsGeneratingPfp] = useState(false)
  const [cvAnalysis, setCvAnalysis] = useState<CVAnalysis | null>(null)
  const [profileImage, setProfileImage] = useState<string>("")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  const { user, updateProfile } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      // Simulate file reading and text extraction
      const reader = new FileReader()
      reader.onload = async (e) => {
        const text = e.target?.result as string

        // Simulate CV text for demo (in real app, you'd extract text from PDF/DOCX)
        const sampleCVText = `
          John Doe
          Senior Software Developer
          
          Experience:
          - Senior Software Developer at TechCorp (2020-2024)
          - Full Stack Developer at StartupXYZ (2018-2020)
          - Junior Developer at WebAgency (2016-2018)
          
          Skills: React, Node.js, TypeScript, Python, AWS, Docker, MongoDB, PostgreSQL
          
          Education:
          - Master of Computer Science - University of Technology (2016)
          - Bachelor of Software Engineering - Tech Institute (2014)
        `

        setIsUploading(false)
        setIsAnalyzing(true)

        try {
          const analysis = await analyzeCVAndGenerateQuiz(sampleCVText)
          setCvAnalysis(analysis)
          setIsAnalyzing(false)

          // Generate profile picture
          setIsGeneratingPfp(true)
          const pfpUrl = await generateProfilePicture(
            `${user?.profile?.firstName || "User"} ${user?.profile?.lastName || ""}`,
            "Software Developer",
          )
          setProfileImage(pfpUrl)
          setIsGeneratingPfp(false)

          setStep(2)

          toast({
            title: "CV Analysis Complete",
            description: "Your profile has been generated and quiz is ready!",
          })
        } catch (error) {
          setIsAnalyzing(false)
          toast({
            title: "Analysis Failed",
            description: "Please try uploading your CV again.",
            variant: "destructive",
          })
        }
      }

      reader.readAsText(file)
    } catch (error) {
      setIsUploading(false)
      toast({
        title: "Upload Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...quizAnswers, selectedAnswer]
    setQuizAnswers(newAnswers)

    if (currentQuestion + 1 < (cvAnalysis?.quiz.length || 0)) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // Calculate final score
      let correctAnswers = 0
      cvAnalysis?.quiz.forEach((question, index) => {
        if (newAnswers[index] === question.correctAnswer) {
          correctAnswers++
        }
      })

      const quizScore = (correctAnswers / (cvAnalysis?.quiz.length || 1)) * 10
      const cvScore = cvAnalysis?.cvRelevanceScore || 5
      const verificationBonus = user?.verificationStatus?.selfie ? 1 : 0
      const idBonus = user?.verificationStatus?.idDocument ? 0.5 : 0

      const composite = Math.min(10, quizScore * 0.6 + cvScore * 0.3 + verificationBonus + idBonus)
      setFinalScore(Math.round(composite * 10) / 10)
      setQuizCompleted(true)
    }
  }

  const handleCompleteProfile = async () => {
    const profileData = {
      ...cvAnalysis,
      profileImage,
      compositeScore: finalScore,
      quizResults: {
        answers: quizAnswers,
        score: finalScore,
        completedAt: new Date().toISOString(),
      },
    }

    updateProfile(profileData)

    toast({
      title: "Profile Complete!",
      description: `Your composite score is ${finalScore}/10 stars. You can now search for jobs!`,
    })

    router.push("/dashboard/applicant")
  }

  const handleCustomProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Upload your CV and complete the AI assessment to get started</p>

          <div className="flex justify-center space-x-2 mt-4">
            <Badge variant={step >= 1 ? "default" : "secondary"}>CV Upload</Badge>
            <Badge variant={step >= 2 ? "default" : "secondary"}>AI Assessment</Badge>
            <Badge variant={step >= 3 ? "default" : "secondary"}>Profile Review</Badge>
          </div>
          <Progress value={(step / 3) * 100} className="mt-2 max-w-md mx-auto" />
        </div>

        {/* Step 1: CV Upload */}
        {step === 1 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <FileText className="h-6 w-6" />
                <span>Upload Your CV</span>
              </CardTitle>
              <CardDescription>
                Upload your CV (PDF/DOCX) and let our AI analyze your skills, experience, and education
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isUploading && !isAnalyzing ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Upload your CV</p>
                  <p className="text-sm text-gray-600 mb-6">PDF or DOCX files supported (max 10MB)</p>
                  <input type="file" accept=".pdf,.docx" onChange={handleCVUpload} className="hidden" id="cv-upload" />
                  <label htmlFor="cv-upload">
                    <Button asChild size="lg">
                      <span>
                        <Upload className="mr-2 h-5 w-5" />
                        Choose File
                      </span>
                    </Button>
                  </label>
                </div>
              ) : (
                <div className="text-center space-y-6 py-12">
                  {isUploading && (
                    <>
                      <Upload className="h-16 w-16 text-blue-600 mx-auto animate-pulse" />
                      <div>
                        <p className="text-lg font-medium">Uploading CV...</p>
                        <Progress value={75} className="max-w-xs mx-auto mt-2" />
                      </div>
                    </>
                  )}
                  {isAnalyzing && (
                    <>
                      <Brain className="h-16 w-16 text-purple-600 mx-auto animate-pulse" />
                      <div>
                        <p className="text-lg font-medium">AI is analyzing your CV...</p>
                        <p className="text-sm text-gray-600 mt-2">
                          Extracting skills, experience, education, and generating personalized quiz
                        </p>
                        <div className="flex items-center justify-center space-x-2 mt-4">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">This may take a few moments...</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: AI Assessment Quiz */}
        {step === 2 && cvAnalysis && !quizCompleted && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6" />
                  <span>AI Assessment Quiz</span>
                </CardTitle>
                <Badge variant="outline">
                  Question {currentQuestion + 1} of {cvAnalysis.quiz.length}
                </Badge>
              </div>
              <Progress value={((currentQuestion + 1) / cvAnalysis.quiz.length) * 100} />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant={cvAnalysis.quiz[currentQuestion].type === "iq" ? "default" : "secondary"}>
                    {cvAnalysis.quiz[currentQuestion].type === "iq" ? "IQ Question" : "Technical Question"}
                  </Badge>
                </div>
                <h3 className="text-lg font-medium mb-6">{cvAnalysis.quiz[currentQuestion].question}</h3>
                <div className="space-y-3">
                  {cvAnalysis.quiz[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto p-4"
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  disabled={currentQuestion === 0}
                  onClick={() => {
                    setCurrentQuestion(currentQuestion - 1)
                    setSelectedAnswer(quizAnswers[currentQuestion - 1] || null)
                  }}
                >
                  Previous
                </Button>
                <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
                  {currentQuestion + 1 === cvAnalysis.quiz.length ? "Complete Assessment" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Profile Review & Completion */}
        {(step === 2 && quizCompleted) || step === 3 ? (
          <div className="space-y-6">
            {/* Score Card */}
            <Card>
              <CardHeader className="text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle>Assessment Complete!</CardTitle>
                <CardDescription>Your AI-powered profile has been generated</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {[...Array(Math.floor(finalScore))].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                  ))}
                  {finalScore % 1 !== 0 && <Star className="h-6 w-6 text-yellow-500 fill-current opacity-50" />}
                  <span className="text-2xl font-bold ml-2">{finalScore}/10</span>
                </div>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {finalScore >= 8 ? "Excellent Profile" : finalScore >= 6 ? "Good Profile" : "Developing Profile"}
                </Badge>
              </CardContent>
            </Card>

            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Profile Picture</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Avatar className="h-32 w-32 mx-auto">
                  <AvatarImage src={profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {user?.profile?.firstName?.[0]}
                    {user?.profile?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>

                {isGeneratingPfp && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>AI is generating your profile picture...</span>
                  </div>
                )}

                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomProfileImage}
                    className="hidden"
                    id="profile-image-upload"
                  />
                  <label htmlFor="profile-image-upload">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Custom Picture
                      </span>
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Generated Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>AI-Generated Profile Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{cvAnalysis?.summary}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Extracted Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {cvAnalysis?.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Work Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cvAnalysis?.experience.map((exp, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Education</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cvAnalysis?.education.map((edu, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={handleCompleteProfile}>
              Complete Profile & Start Job Search
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
