"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Users, Briefcase, Clock, Plus, MoreHorizontal, Star, MapPin, Eye, Calendar, Building2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function EmployerDashboard() {
  const { user } = useAuth()
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [requirements, setRequirements] = useState("")

  const stats = [
    { label: "Active Jobs", value: "12", icon: Briefcase, color: "text-blue-600", change: "+2" },
    { label: "Total Applicants", value: "248", icon: Users, color: "text-green-600", change: "+15%" },
    { label: "Interviews Scheduled", value: "18", icon: Calendar, color: "text-purple-600", change: "+3" },
    { label: "Profile Views", value: "1.2k", icon: Eye, color: "text-orange-600", change: "+8%" },
  ]

  const recentApplications = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Frontend Developer",
      experience: "5 years",
      skills: ["React", "TypeScript", "Node.js"],
      match: 95,
      applied: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Full Stack Engineer",
      experience: "3 years",
      skills: ["Python", "Django", "React"],
      match: 88,
      applied: "5 hours ago",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "UX Designer",
      experience: "4 years",
      skills: ["Figma", "Sketch", "Prototyping"],
      match: 92,
      applied: "1 day ago",
      avatar: "/placeholder.svg?height=40&width=40&text=ER",
    },
  ]

  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      applicants: 45,
      posted: "3 days ago",
      status: "Active",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      applicants: 32,
      posted: "1 week ago",
      status: "Active",
      location: "Remote",
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      applicants: 28,
      posted: "5 days ago",
      status: "Active",
      location: "New York, NY",
    },
  ]

  const handleGenerateJobDescription = async () => {
    if (!jobTitle.trim()) {
      alert("Please enter a job title first")
      return
    }

    setIsGenerating(true)
    try {
      // Fallback job description generation when API is not available
      const fallbackDescription = `We are seeking a talented ${jobTitle} to join our dynamic team. 

Key Responsibilities:
• Lead and contribute to innovative projects
• Collaborate with cross-functional teams
• Drive technical excellence and best practices
• Mentor junior team members
• Participate in strategic planning and decision-making

Requirements:
• Bachelor's degree in relevant field or equivalent experience
• Strong problem-solving and analytical skills
• Excellent communication and teamwork abilities
• Proven track record of delivering high-quality results
• Passion for continuous learning and growth

What We Offer:
• Competitive salary and benefits package
• Flexible work arrangements
• Professional development opportunities
• Collaborative and inclusive work environment
• Cutting-edge technology and tools

${requirements ? `Additional Requirements:\n${requirements}` : ""}

Join us in shaping the future of our industry!`

      setJobDescription(fallbackDescription)
    } catch (error) {
      console.error("Failed to generate job description:", error)
      setJobDescription("Failed to generate job description. Please try again or write manually.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pb-24">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              <span className="hidden sm:inline">TechCorp Inc.</span>
              <span className="sm:hidden">Dashboard</span>
              <span className="ml-2">🏢</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Manage your recruitment pipeline and find top talent
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="flex-1 sm:flex-none">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Post New Job</span>
              <span className="sm:hidden">Post Job</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AI Job Description Generator */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl">AI Job Description Generator</CardTitle>
              <CardDescription className="text-sm">Generate compelling job descriptions using AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jobTitle" className="text-sm font-medium">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior Frontend Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="requirements" className="text-sm font-medium">
                  Additional Requirements (Optional)
                </Label>
                <Textarea
                  id="requirements"
                  placeholder="e.g., 5+ years experience, React expertise..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="mt-1 min-h-[80px]"
                />
              </div>
              <Button onClick={handleGenerateJobDescription} disabled={isGenerating} className="w-full">
                {isGenerating ? "Generating..." : "Generate Job Description"}
              </Button>
              {jobDescription && (
                <div className="mt-4">
                  <Label className="text-sm font-medium">Generated Description</Label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="mt-1 min-h-[200px]"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl">Recent Applications</CardTitle>
              <CardDescription className="text-sm">Latest candidates who applied to your jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.name} />
                        <AvatarFallback>
                          {application.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">{application.name}</h4>
                        <p className="text-xs text-gray-600 truncate">{application.position}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            {application.match}%
                          </Badge>
                          <span className="text-xs text-gray-500">{application.applied}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="ml-2 bg-transparent">
                      <span className="hidden sm:inline">View</span>
                      <Eye className="h-4 w-4 sm:hidden" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Jobs */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl">Active Job Postings</CardTitle>
                <CardDescription className="text-sm mt-1">Manage your current job openings</CardDescription>
              </div>
              <Button variant="outline" className="mt-3 sm:mt-0 bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Create New Job</span>
                <span className="sm:hidden">New Job</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{job.title}</h3>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center">
                          <Building2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {job.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {job.applicants} applicants
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                      <Button size="sm" variant="outline">
                        <span className="hidden sm:inline">View Applications</span>
                        <span className="sm:hidden">Applications</span>
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
