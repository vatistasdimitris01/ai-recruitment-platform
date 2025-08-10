"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Bell,
  Settings,
  Upload,
  Eye,
  MessageSquare,
  Calendar,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function ApplicantDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [profileCompletion, setProfileCompletion] = useState(75)

  const recentJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      posted: "2 days ago",
      match: 95,
      logo: "/placeholder.svg?height=40&width=40&text=TC",
    },
    {
      id: 2,
      title: "React Developer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$90k - $120k",
      type: "Full-time",
      posted: "1 week ago",
      match: 88,
      logo: "/placeholder.svg?height=40&width=40&text=SX",
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "InnovateLab",
      location: "New York, NY",
      salary: "$100k - $130k",
      type: "Full-time",
      posted: "3 days ago",
      match: 82,
      logo: "/placeholder.svg?height=40&width=40&text=IL",
    },
  ]

  const upcomingInterviews = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      date: "Tomorrow",
      time: "2:00 PM",
      type: "Video Call",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "React Developer",
      date: "Friday",
      time: "10:00 AM",
      type: "Phone Screen",
    },
  ]

  const stats = [
    { label: "Applications Sent", value: "24", icon: Briefcase, color: "text-blue-600" },
    { label: "Profile Views", value: "156", icon: Eye, color: "text-green-600" },
    { label: "Messages", value: "8", icon: MessageSquare, color: "text-purple-600" },
    { label: "Interviews", value: "3", icon: Calendar, color: "text-orange-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-24">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {user?.name || "User"}! 👋</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Here's what's happening with your job search today
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Settings
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
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Completion */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl">Profile Completion</CardTitle>
              <CardDescription className="text-sm">Complete your profile to get better job matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="font-medium">{profileCompletion}%</span>
                  </div>
                  <Progress value={profileCompletion} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Basic info completed</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>CV uploaded</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span>Add portfolio links</span>
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={() => router.push("/dashboard/applicant/profile")}>
                  <Upload className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl">Upcoming Interviews</CardTitle>
              <CardDescription className="text-sm">Don't miss your scheduled interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{interview.company}</h4>
                      <p className="text-sm text-gray-600 truncate">{interview.position}</p>
                      <p className="text-xs text-blue-600 mt-1">{interview.type}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-medium text-gray-900">{interview.date}</p>
                      <p className="text-xs text-gray-600">{interview.time}</p>
                    </div>
                  </div>
                ))}
                {upcomingInterviews.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No upcoming interviews</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Jobs */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl">Recommended Jobs</CardTitle>
                <CardDescription className="text-sm mt-1">Jobs matched to your profile and preferences</CardDescription>
              </div>
              <Button
                variant="outline"
                className="mt-3 sm:mt-0 bg-transparent"
                onClick={() => router.push("/dashboard/applicant/jobs")}
              >
                View All Jobs
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                        <AvatarImage src={job.logo || "/placeholder.svg"} alt={job.company} />
                        <AvatarFallback>{job.company.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {job.salary}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {job.posted}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          {job.match}% match
                        </Badge>
                      </div>
                      <Button size="sm" className="whitespace-nowrap">
                        Apply Now
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
