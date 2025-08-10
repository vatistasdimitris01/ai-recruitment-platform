"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Edit,
  Plus,
  MoreHorizontal,
  Home,
  Search,
  MessageSquare,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function ApplicantProfile() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const { user, logout, updateProfile } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account.",
    })
    router.push("/")
  }

  const mockProfile = {
    name: "Sarah Johnson",
    email: user?.email || "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    bio: "Passionate frontend developer with 5+ years of experience building modern web applications. Specialized in React, TypeScript, and user experience design.",
    avatar: "/professional-woman-diverse.png",
    skills: ["React", "TypeScript", "JavaScript", "CSS", "Node.js", "Python", "Git", "Figma"],
    experience: [
      {
        company: "TechCorp Inc.",
        position: "Senior Frontend Developer",
        duration: "2022 - Present",
        description: "Lead frontend development for enterprise applications serving 100k+ users.",
      },
      {
        company: "StartupXYZ",
        position: "Frontend Developer",
        duration: "2020 - 2022",
        description: "Built responsive web applications using React and modern JavaScript frameworks.",
      },
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science in Computer Science",
        year: "2020",
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Full-stack e-commerce solution with React and Node.js",
        technologies: ["React", "Node.js", "MongoDB"],
      },
      {
        name: "Task Management App",
        description: "Collaborative task management tool with real-time updates",
        technologies: ["React", "Socket.io", "Express"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/dashboard/applicant")}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/applicant/jobs")}>
                  <Search className="mr-2 h-4 w-4" />
                  Find Jobs
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/applicant/messages")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={mockProfile.avatar || "/placeholder.svg"} alt={mockProfile.name} />
                      <AvatarFallback>
                        {mockProfile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{mockProfile.name}</CardTitle>
                      <CardDescription className="text-lg">{mockProfile.title}</CardDescription>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {mockProfile.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {mockProfile.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {mockProfile.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{mockProfile.bio}</p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Experience</p>
                      <p className="text-2xl font-bold">5+ Years</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Skills</p>
                      <p className="text-2xl font-bold">{mockProfile.skills.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <GraduationCap className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Education</p>
                      <p className="text-2xl font-bold">BS CS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
            {mockProfile.experience.map((exp, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{exp.position}</h4>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {exp.duration}
                      </p>
                      <p className="mt-3 text-gray-700">{exp.description}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Skills & Technologies</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {mockProfile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Projects</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
            {mockProfile.projects.map((project, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-gray-700 mt-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Education</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
            {mockProfile.education.map((edu, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        Graduated {edu.year}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={mockProfile.email} disabled />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={mockProfile.phone} />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={mockProfile.location} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Profile Visibility</h4>
                    <p className="text-sm text-gray-600">Make your profile visible to employers</p>
                  </div>
                  <Button variant="outline">Public</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive job alerts and messages</p>
                  </div>
                  <Button variant="outline">Enabled</Button>
                </div>
                <Separator />
                <div className="pt-4">
                  <Button variant="destructive" onClick={handleLogout} className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
