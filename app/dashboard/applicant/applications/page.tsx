"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare,
  FileText,
  Users,
  Star,
  ArrowRight,
  Phone,
  Video,
  ExternalLink,
  Download,
  Briefcase,
  DollarSign,
  Target,
  Zap,
  Brain,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
} from "lucide-react"

interface Application {
  id: string
  jobTitle: string
  company: string
  companyLogo: string
  location: string
  salary: string
  appliedDate: string
  status: "applied" | "screening" | "interview" | "offer" | "rejected" | "withdrawn"
  stage: string
  progress: number
  matchScore: number
  aiInsights: string[]
  nextStep: string
  timeline: {
    date: string
    event: string
    status: "completed" | "current" | "upcoming"
    description?: string
  }[]
  interviewDetails?: {
    type: "phone" | "video" | "onsite"
    date: string
    time: string
    interviewer: string
    notes?: string
  }
  feedback?: {
    rating: number
    comments: string
    strengths: string[]
    improvements: string[]
  }
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  const applications: Application[] = [
    {
      id: "1",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      companyLogo: "/placeholder.svg?height=40&width=40&text=TC",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      appliedDate: "2024-01-15",
      status: "interview",
      stage: "Technical Interview",
      progress: 60,
      matchScore: 95,
      aiInsights: [
        "Strong match for React and TypeScript requirements",
        "Your experience aligns well with their tech stack",
        "Company culture seems to match your preferences",
      ],
      nextStep: "Prepare for system design interview on Jan 25",
      timeline: [
        { date: "2024-01-15", event: "Application Submitted", status: "completed" },
        { date: "2024-01-18", event: "Application Reviewed", status: "completed" },
        { date: "2024-01-20", event: "Phone Screening", status: "completed", description: "30-min call with HR" },
        { date: "2024-01-25", event: "Technical Interview", status: "current", description: "System design & coding" },
        { date: "2024-01-30", event: "Final Interview", status: "upcoming", description: "Meet with team lead" },
      ],
      interviewDetails: {
        type: "video",
        date: "2024-01-25",
        time: "2:00 PM PST",
        interviewer: "Sarah Johnson, Engineering Manager",
        notes: "Focus on React patterns and system architecture",
      },
      feedback: {
        rating: 4,
        comments: "Strong technical skills, good communication",
        strengths: ["React expertise", "Problem-solving", "Team collaboration"],
        improvements: ["System design depth", "Leadership examples"],
      },
    },
    {
      id: "2",
      jobTitle: "Full Stack Engineer",
      company: "StartupXYZ",
      companyLogo: "/placeholder.svg?height=40&width=40&text=SX",
      location: "Remote",
      salary: "$90k - $120k",
      appliedDate: "2024-01-10",
      status: "offer",
      stage: "Offer Extended",
      progress: 100,
      matchScore: 88,
      aiInsights: [
        "Excellent cultural fit based on company values",
        "Remote work preference aligns perfectly",
        "Startup environment matches your career goals",
      ],
      nextStep: "Review offer details and respond by Jan 28",
      timeline: [
        { date: "2024-01-10", event: "Application Submitted", status: "completed" },
        { date: "2024-01-12", event: "Phone Screening", status: "completed" },
        { date: "2024-01-15", event: "Technical Challenge", status: "completed" },
        { date: "2024-01-18", event: "Team Interview", status: "completed" },
        { date: "2024-01-22", event: "Offer Extended", status: "completed" },
      ],
    },
    {
      id: "3",
      jobTitle: "React Developer",
      company: "WebAgency",
      companyLogo: "/placeholder.svg?height=40&width=40&text=WA",
      location: "New York, NY",
      salary: "$80k - $110k",
      appliedDate: "2024-01-08",
      status: "rejected",
      stage: "Application Rejected",
      progress: 25,
      matchScore: 76,
      aiInsights: [
        "Skills match was good but experience level didn't align",
        "Consider similar roles with 3-5 years requirement",
        "Your portfolio impressed but they needed more backend experience",
      ],
      nextStep: "Apply to similar roles with better experience match",
      timeline: [
        { date: "2024-01-08", event: "Application Submitted", status: "completed" },
        { date: "2024-01-12", event: "Application Reviewed", status: "completed" },
        { date: "2024-01-15", event: "Application Rejected", status: "completed" },
      ],
      feedback: {
        rating: 3,
        comments: "Good skills but looking for more backend experience",
        strengths: ["Frontend skills", "Portfolio quality"],
        improvements: ["Backend experience", "Full-stack capabilities"],
      },
    },
    {
      id: "4",
      jobTitle: "Software Engineer",
      company: "BigTech Corp",
      companyLogo: "/placeholder.svg?height=40&width=40&text=BT",
      location: "Seattle, WA",
      salary: "$140k - $180k",
      appliedDate: "2024-01-05",
      status: "screening",
      stage: "Initial Screening",
      progress: 30,
      matchScore: 91,
      aiInsights: [
        "High-profile company with excellent growth opportunities",
        "Compensation package significantly above market rate",
        "Technical bar is high - prepare thoroughly for interviews",
      ],
      nextStep: "Complete online assessment by Jan 26",
      timeline: [
        { date: "2024-01-05", event: "Application Submitted", status: "completed" },
        { date: "2024-01-08", event: "Application Reviewed", status: "completed" },
        { date: "2024-01-12", event: "Online Assessment", status: "current" },
        { date: "2024-01-20", event: "Phone Interview", status: "upcoming" },
      ],
    },
    {
      id: "5",
      jobTitle: "Frontend Architect",
      company: "DesignStudio",
      companyLogo: "/placeholder.svg?height=40&width=40&text=DS",
      location: "Los Angeles, CA",
      salary: "$130k - $160k",
      appliedDate: "2024-01-03",
      status: "applied",
      stage: "Application Under Review",
      progress: 15,
      matchScore: 82,
      aiInsights: [
        "Leadership role aligns with your career progression goals",
        "Design-focused company values your UI/UX interest",
        "Salary range matches your expectations",
      ],
      nextStep: "Wait for initial response (typically 5-7 business days)",
      timeline: [
        { date: "2024-01-03", event: "Application Submitted", status: "completed" },
        { date: "2024-01-05", event: "Application Under Review", status: "current" },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800"
      case "screening":
        return "bg-yellow-100 text-yellow-800"
      case "interview":
        return "bg-purple-100 text-purple-800"
      case "offer":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "withdrawn":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="h-4 w-4" />
      case "screening":
        return <Eye className="h-4 w-4" />
      case "interview":
        return <Users className="h-4 w-4" />
      case "offer":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "withdrawn":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || app.status === activeTab
    return matchesSearch && matchesTab
  })

  const stats = {
    total: applications.length,
    active: applications.filter((app) => ["applied", "screening", "interview"].includes(app.status)).length,
    interviews: applications.filter((app) => app.status === "interview").length,
    offers: applications.filter((app) => app.status === "offer").length,
    avgMatchScore: Math.round(applications.reduce((sum, app) => sum + app.matchScore, 0) / applications.length),
    responseRate: Math.round(
      (applications.filter((app) => app.status !== "applied").length / applications.length) * 100,
    ),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-24">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/applicant">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Applications</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
            <p className="text-gray-600">Track your job applications and interview progress</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Applications
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.total}</div>
              <p className="text-xs text-gray-600">Total Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.active}</div>
              <p className="text-xs text-gray-600">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.interviews}</div>
              <p className="text-xs text-gray-600">Interviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.offers}</div>
              <p className="text-xs text-gray-600">Offers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{stats.avgMatchScore}%</div>
              <p className="text-xs text-gray-600">Avg Match</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-1">{stats.responseRate}%</div>
              <p className="text-xs text-gray-600">Response Rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search applications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
                <TabsTrigger value="screening">Screening</TabsTrigger>
                <TabsTrigger value="interview">Interview</TabsTrigger>
                <TabsTrigger value="offer">Offers</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4 mt-6">
                {filteredApplications.map((application) => (
                  <Card
                    key={application.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedApplication?.id === application.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedApplication(application)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={application.companyLogo || "/placeholder.svg"} />
                            <AvatarFallback>{application.company.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
                            <p className="text-blue-600 font-medium">{application.company}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {application.location}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {application.salary}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Applied {new Date(application.appliedDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <Star className="h-3 w-3 mr-1" />
                            {application.matchScore}% match
                          </Badge>
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1 capitalize">{application.status}</span>
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{application.stage}</span>
                            <span>{application.progress}%</span>
                          </div>
                          <Progress value={application.progress} className="h-2" />
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Brain className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-blue-900 mb-1">AI Insights</p>
                              <p className="text-sm text-blue-700">{application.aiInsights[0]}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <Target className="h-4 w-4 mr-1" />
                            <span>{application.nextStep}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredApplications.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                      <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                      <Button>Browse Jobs</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Application Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedApplication ? (
              <div className="space-y-6">
                {/* Application Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Application Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedApplication.companyLogo || "/placeholder.svg"} />
                        <AvatarFallback>{selectedApplication.company.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{selectedApplication.jobTitle}</h4>
                        <p className="text-sm text-gray-600">{selectedApplication.company}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{selectedApplication.progress}%</span>
                      </div>
                      <Progress value={selectedApplication.progress} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Applied</p>
                        <p className="font-medium">{new Date(selectedApplication.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Match Score</p>
                        <p className="font-medium text-green-600">{selectedApplication.matchScore}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Application Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedApplication.timeline.map((event, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                              event.status === "completed"
                                ? "bg-green-500"
                                : event.status === "current"
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{event.event}</p>
                            <p className="text-xs text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                            {event.description && <p className="text-xs text-gray-500 mt-1">{event.description}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Interview Details */}
                {selectedApplication.interviewDetails && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Interview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        {selectedApplication.interviewDetails.type === "video" && (
                          <Video className="h-4 w-4 text-blue-600" />
                        )}
                        {selectedApplication.interviewDetails.type === "phone" && (
                          <Phone className="h-4 w-4 text-green-600" />
                        )}
                        {selectedApplication.interviewDetails.type === "onsite" && (
                          <Building2 className="h-4 w-4 text-purple-600" />
                        )}
                        <span className="font-medium capitalize">
                          {selectedApplication.interviewDetails.type} Interview
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="text-gray-600">Date:</span> {selectedApplication.interviewDetails.date}
                        </p>
                        <p>
                          <span className="text-gray-600">Time:</span> {selectedApplication.interviewDetails.time}
                        </p>
                        <p>
                          <span className="text-gray-600">Interviewer:</span>{" "}
                          {selectedApplication.interviewDetails.interviewer}
                        </p>
                      </div>
                      {selectedApplication.interviewDetails.notes && (
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm text-yellow-800">{selectedApplication.interviewDetails.notes}</p>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Add to Calendar
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* AI Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-600" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedApplication.aiInsights.map((insight, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Feedback */}
                {selectedApplication.feedback && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Interview Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < selectedApplication.feedback!.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{selectedApplication.feedback.rating}/5</span>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Comments</p>
                        <p className="text-sm text-gray-700">{selectedApplication.feedback.comments}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2 flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1 text-green-600" />
                          Strengths
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedApplication.feedback.strengths.map((strength, i) => (
                            <Badge key={i} variant="outline" className="text-xs text-green-700 border-green-300">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2 flex items-center">
                          <ThumbsDown className="h-4 w-4 mr-1 text-orange-600" />
                          Areas for Improvement
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedApplication.feedback.improvements.map((improvement, i) => (
                            <Badge key={i} variant="outline" className="text-xs text-orange-700 border-orange-300">
                              {improvement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message Recruiter
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Job Details
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Company Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Application</h3>
                  <p className="text-gray-600">Click on an application to view detailed information and timeline</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
