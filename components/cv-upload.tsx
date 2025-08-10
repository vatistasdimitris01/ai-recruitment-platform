"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Brain, CheckCircle, User, GraduationCap, Briefcase } from "lucide-react"

interface CVAnalysis {
  skills: string[]
  experience: string[]
  education: string[]
  summary: string
}

export default function CVUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setIsUploading(false)
          setIsAnalyzing(true)
          analyzeCV()
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const analyzeCV = async () => {
    // Simulate AI analysis - in real app, this would call Gemini AI
    setTimeout(() => {
      setAnalysis({
        skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "MongoDB"],
        experience: [
          "Senior Software Developer at TechCorp (2020-2024)",
          "Full Stack Developer at StartupXYZ (2018-2020)",
          "Junior Developer at WebAgency (2016-2018)",
        ],
        education: [
          "Master of Computer Science - University of Technology (2016)",
          "Bachelor of Software Engineering - Tech Institute (2014)",
        ],
        summary:
          "Experienced full-stack developer with 8+ years in web development. Specializes in React, Node.js, and cloud technologies. Strong background in agile development and team leadership.",
      })
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  if (analysisComplete && analysis) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle>CV Analysis Complete</CardTitle>
            </div>
            <CardDescription>AI has successfully analyzed your CV and extracted key information</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Professional Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{analysis.summary}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Skills Extracted</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>Work Experience</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.experience.map((exp, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {exp}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Education</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.education.map((edu, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {edu}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Button className="w-full">Generate Skills Quiz Based on CV</Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span>CV Upload & AI Analysis</span>
        </CardTitle>
        <CardDescription>
          Upload your CV (PDF/DOCX) and let our AI extract your skills, experience, and education
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isUploading && !isAnalyzing ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Upload your CV</p>
            <p className="text-sm text-gray-600 mb-4">PDF or DOCX files supported (max 10MB)</p>
            <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="hidden" id="cv-upload" />
            <label htmlFor="cv-upload">
              <Button asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="text-center space-y-4">
            {isUploading && (
              <>
                <Upload className="h-12 w-12 text-blue-600 mx-auto" />
                <p className="font-medium">Uploading CV...</p>
                <Progress value={uploadProgress} className="max-w-xs mx-auto" />
              </>
            )}
            {isAnalyzing && (
              <>
                <Brain className="h-12 w-12 text-purple-600 mx-auto animate-pulse" />
                <p className="font-medium">AI is analyzing your CV...</p>
                <p className="text-sm text-gray-600">Extracting skills, experience, and education information</p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
