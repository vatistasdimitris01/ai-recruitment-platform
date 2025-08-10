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
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  Briefcase,
  Edit,
  Plus,
  MoreHorizontal,
  Home,
  Search,
  MessageSquare,
  LogOut,
  Eye,
  TrendingUp,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function EmployerProfile() {
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

  const mockCompany = {
    name: "TechCorp Solutions",
    email: user?.email || "hr@techcorp.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    website: "www.techcorp.com",
    industry: "Technology",
    size: "201-500 employees",
    founded: "2015",
    description:
      "Leading technology company specializing in innovative software solutions for enterprise clients. We're passionate about creating cutting-edge products that transform businesses.",
    logo: "/abstract-tech-logo.png",
    benefits: [
      "Health Insurance",
      "401k Matching",
      "Remote Work",
      "Flexible Hours",
      "Professional Development",
      "Stock Options",
    ],
    activeJobs: 12,
    totalApplications: 245,
    hiredCandidates: 18,
    responseRate: 85,
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Company Profile</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/dashboard/employer")}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/employer/candidates")}>
                  <Search className="mr-2 h-4 w-4" />
                  Find Candidates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/employer/messages")}>
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

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={mockCompany.logo || "/placeholder.svg"} alt={mockCompany.name} />
                      <AvatarFallback>
                        <Building2 className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{mockCompany.name}</CardTitle>
                      <CardDescription className="text-lg">{mockCompany.industry}</CardDescription>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {mockCompany.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {mockCompany.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {mockCompany.location}
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1" />
                          {mockCompany.website}
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
                <p className="text-gray-700 mb-4">{mockCompany.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Company Size:</span> {mockCompany.size}
                  </div>
                  <div>
                    <span className="font-medium">Founded:</span> {mockCompany.founded}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                      <p className="text-2xl font-bold">{mockCompany.activeJobs}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Applications</p>
                      <p className="text-2xl font-bold">{mockCompany.totalApplications}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Hired</p>
                      <p className="text-2xl font-bold">{mockCompany.hiredCandidates}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Eye className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Response Rate</p>
                      <p className="text-2xl font-bold">{mockCompany.responseRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Company Benefits</CardTitle>
                <CardDescription>Perks and benefits offered to employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockCompany.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Job Postings</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </div>
            <div className="grid gap-4">
              {[1, 2, 3].map((job) => (
                <Card key={job}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">Senior Frontend Developer</h4>
                        <p className="text-sm text-gray-600 mt-1">Full-time • Remote • $120k - $150k</p>
                        <p className="text-sm text-gray-500 mt-2">Posted 3 days ago • 24 applications</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>This Month</span>
                        <span>89 applications</span>
                      </div>
                      <Progress value={89} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Last Month</span>
                        <span>67 applications</span>
                      </div>
                      <Progress value={67} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Applied</span>
                      <span className="font-medium">245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Screening</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Interview</span>
                      <span className="font-medium">34</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Hired</span>
                      <span className="font-medium">18</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" value={mockCompany.name} />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" value={mockCompany.industry} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" value={mockCompany.email} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={mockCompany.phone} />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" value={mockCompany.website} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={mockCompany.location} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates about applications and messages</p>
                  </div>
                  <Button variant="outline">Enabled</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Company Visibility</h4>
                    <p className="text-sm text-gray-600">Make your company profile visible to job seekers</p>
                  </div>
                  <Button variant="outline">Public</Button>
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

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription and billing information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Professional Plan</h4>
                    <p className="text-sm text-gray-600">$99/month • Up to 50 job postings</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">View Invoices</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
