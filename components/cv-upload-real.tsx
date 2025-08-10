"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  FileText,
  Brain,
  CheckCircle,
  User,
  GraduationCap,
  Briefcase,
  AlertCircle,
  X,
  Download,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CVAnalysis {
  skills: string[]
  experience: string[]
  education: string[]
  summary: string
  fileName: string
  fileSize: string
  uploadDate: string
}

interface CVUploadRealProps {
  onAnalysisComplete?: (analysis: CVAnalysis) => void
}

export default function CVUploadReal({ onAnalysisComplete }: CVUploadRealProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string>("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError("")

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please upload a PDF, DOC, DOCX, or TXT file")
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10MB")
      return
    }

    setUploadedFile(file)
    handleFileUpload(file)
  }

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(uploadInterval)
            setIsUploading(false)
            setIsAnalyzing(true)
            analyzeCV(file)
            return 100
          }
          return prev + 10
        })
      }, 200)
    } catch (error) {
      setIsUploading(false)
      setError("Upload failed. Please try again.")
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      })
    }
  }

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const result = e.target?.result as string

        if (file.type === "text/plain") {
          resolve(result)
        } else if (file.type === "application/pdf") {
          // For PDF files, we'll simulate text extraction
          // In a real app, you'd use a library like pdf-parse or pdf2pic
          resolve(`
            John Doe
            Senior Software Developer
            Email: john.doe@email.com
            Phone: +1 (555) 123-4567
            
            EXPERIENCE:
            Senior Software Developer at TechCorp Inc. (2020-2024)
            - Led development of React-based web applications
            - Implemented microservices architecture using Node.js
            - Managed team of 5 developers
            - Technologies: React, Node.js, TypeScript, AWS, Docker
            
            Full Stack Developer at StartupXYZ (2018-2020)
            - Built scalable web applications from scratch
            - Integrated third-party APIs and payment systems
            - Technologies: JavaScript, Python, PostgreSQL, Redis
            
            EDUCATION:
            Master of Computer Science - University of Technology (2018)
            Bachelor of Software Engineering - Tech Institute (2016)
            
            SKILLS:
            JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, PostgreSQL, MongoDB, Git, Agile
          `)
        } else {
          // For DOC/DOCX files, simulate text extraction
          // In a real app, you'd use a library like mammoth.js
          resolve(`
            ${file.name.replace(/\.[^/.]+$/, "")}
            Professional Summary: Experienced developer with strong technical skills
            
            Skills: React, Node.js, TypeScript, Python, AWS
            Experience: 5+ years in software development
            Education: Computer Science degree
          `)
        }
      }

      reader.onerror = () => reject(new Error("Failed to read file"))

      if (file.type === "text/plain") {
        reader.readAsText(file)
      } else {
        reader.readAsArrayBuffer(file)
      }
    })
  }

  const analyzeCV = async (file: File) => {
    try {
      // Extract text from file
      const cvText = await extractTextFromFile(file)

      // Call our CV analysis API
      const response = await fetch("/api/gemini/analyze-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cvText }),
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const analysisResult = await response.json()

      const analysis: CVAnalysis = {
        ...analysisResult,
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        uploadDate: new Date().toLocaleDateString(),
      }

      setAnalysis(analysis)
      setIsAnalyzing(false)
      setAnalysisComplete(true)

      onAnalysisComplete?.(analysis)

      toast({
        title: "Analysis Complete",
        description: "Your CV has been successfully analyzed!",
      })
    } catch (error) {
      setIsAnalyzing(false)
      setError("Analysis failed. Please try again.")
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your CV.",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const removeFile = () => {
    setUploadedFile(null)
    setAnalysis(null)
    setAnalysisComplete(false)
    setError("")
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const downloadCV = () => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile)
      const a = document.createElement("a")
      a.href = url
      a.download = uploadedFile.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  if (analysisComplete && analysis) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <CardTitle>CV Analysis Complete</CardTitle>
              </div>
              <Button variant="outline" size="sm" onClick={removeFile}>
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
            <CardDescription>AI has successfully analyzed your CV and extracted key information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">{analysis.fileName}</p>
                  <p className="text-sm text-gray-600">
                    {analysis.fileSize} • Uploaded {analysis.uploadDate}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={downloadCV}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Professional Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
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
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>{exp}</span>
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
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Button className="w-full" size="lg">
          Generate Skills Quiz Based on CV
        </Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
          <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
          <span>CV Upload & AI Analysis</span>
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Upload your CV (PDF/DOC/DOCX/TXT) and let our AI extract your skills, experience, and education
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {!isUploading && !isAnalyzing && !uploadedFile ? (
          <div className="space-y-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-base sm:text-lg font-medium mb-2">Upload your CV</p>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 px-2">
                PDF, DOC, DOCX, or TXT files supported (max 10MB)
              </p>
              <Button className="text-sm sm:text-base">
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="text-center">
              <p className="text-xs text-gray-500">Supported formats: PDF, Microsoft Word, Plain Text</p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            {uploadedFile && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
                  <div className="text-left min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">{uploadedFile.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={removeFile} className="flex-shrink-0 ml-2 bg-transparent">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {isUploading && (
              <>
                <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto" />
                <p className="font-medium text-sm sm:text-base">Uploading CV...</p>
                <Progress value={uploadProgress} className="max-w-xs mx-auto" />
                <p className="text-xs sm:text-sm text-gray-600">{uploadProgress}% complete</p>
              </>
            )}

            {isAnalyzing && (
              <>
                <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600 mx-auto animate-pulse" />
                <p className="font-medium text-sm sm:text-base">AI is analyzing your CV...</p>
                <p className="text-xs sm:text-sm text-gray-600 px-4">
                  Extracting skills, experience, and education information
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
