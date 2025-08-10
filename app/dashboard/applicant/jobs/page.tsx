"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, DollarSign, Clock, Star, Bookmark, Filter, Building2, Users, Briefcase } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  posted: string
  applicants: number
  matchScore: number
  isBookmarked: boolean
  companyLogo: string
  companySize: string
  industry: string
}

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState("All Types")
  const [salaryFilter, setSalaryFilter] = useState("Any Salary")
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false)

  const jobs: Job[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $150k",
      description:
        "We're looking for a Senior Frontend Developer to join our growing team. You'll be working on cutting-edge web applications using React, TypeScript, and modern development tools.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "GraphQL knowledge", "Testing experience"],
      benefits: ["Health insurance", "401k matching", "Flexible PTO", "Remote work options"],
      posted: "2 days ago",
      applicants: 45,
      matchScore: 95,
      isBookmarked: true,
      companyLogo: "/placeholder.svg?height=40&width=40&text=TC",
      companySize: "100-500 employees",
      industry: "Technology",
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $120k",
      description:
        "Join our fast-growing startup as a Full Stack Engineer. You'll work across our entire tech stack, from React frontend to Node.js backend, helping shape our product.",
      requirements: ["3+ years full-stack experience", "React & Node.js", "Database design", "API development"],
      benefits: ["Equity package", "Health insurance", "Learning budget", "Flexible hours"],
      posted: "1 week ago",
      applicants: 32,
      matchScore: 88,
      isBookmarked: false,
      companyLogo: "/placeholder.svg?height=40&width=40&text=SX",
      companySize: "10-50 employees",
      industry: "Startup",
    },
    {
      id: "3",
      title: "React Developer",
      company: "InnovateLab",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100k - $130k",
      description:
        "We're seeking a talented React Developer to build innovative user interfaces for our enterprise clients. You'll work with a collaborative team on challenging projects.",
      requirements: ["4+ years React experience", "Redux/Context API", "CSS-in-JS", "Agile methodology"],
      benefits: ["Comprehensive health coverage", "Professional development", "Gym membership", "Catered meals"],
      posted: "3 days ago",
      applicants: 28,
      matchScore: 82,
      isBookmarked: true,
      companyLogo: "/placeholder.svg?height=40&width=40&text=IL",
      companySize: "500+ employees",
      industry: "Consulting",
    },
    {
      id: "4",
      title: "Frontend Engineer",
      company: "DesignStudio",
      location: "Los Angeles, CA",
      type: "Contract",
      salary: "$80 - $100/hour",
      description:
        "Contract opportunity for an experienced Frontend Engineer to work on high-profile client projects. Perfect for someone looking for flexibility and variety.",
      requirements: ["React expertise", "Design system experience", "Performance optimization", "Client communication"],
      benefits: ["Flexible schedule", "High hourly rate", "Interesting projects", "Potential for extension"],
      posted: "5 days ago",
      applicants: 18,
      matchScore: 75,
      isBookmarked: false,
      companyLogo: "/placeholder.svg?height=40&width=40&text=DS",
      companySize: "50-100 employees",
      industry: "Design",
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesJobType = !jobTypeFilter || job.type === jobTypeFilter
    const matchesBookmark = !showBookmarkedOnly || job.isBookmarked

    return matchesSearch && matchesLocation && matchesJobType && matchesBookmark
  })

  const handleBookmark = (jobId: string) => {
    console.log("Bookmarking job:", jobId)
    // In a real app, this would update the bookmark status
  }

  const handleApply = (jobId: string) => {
    console.log("Applying to job:", jobId)
    // In a real app, this would start the application process
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Job</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and interests</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search jobs, companies, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full sm:w-48"
                />
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Types">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Jobs</SheetTitle>
                      <SheetDescription>Refine your job search with these filters</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bookmarked"
                          checked={showBookmarkedOnly}
                          onCheckedChange={setShowBookmarkedOnly}
                        />
                        <Label htmlFor="bookmarked">Show bookmarked only</Label>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Salary Range</Label>
                        <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select salary range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Any Salary">Any Salary</SelectItem>
                            <SelectItem value="50k-80k">$50k - $80k</SelectItem>
                            <SelectItem value="80k-120k">$80k - $120k</SelectItem>
                            <SelectItem value="120k+">$120k+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
          </p>
          <Select defaultValue="match">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="salary">Highest Salary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                      <AvatarFallback>{job.company.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <div className="flex items-center space-x-2 text-gray-600 mb-2">
                            <Building2 className="h-4 w-4 mr-1" />
                            <span>{job.company}</span>
                            <span>•</span>
                            <span>{job.companySize}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge variant="secondary" className="text-sm">
                            <Star className="h-3 w-3 mr-1" />
                            {job.matchScore}% match
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => handleBookmark(job.id)}>
                            <Bookmark className={`h-4 w-4 ${job.isBookmarked ? "fill-current text-blue-600" : ""}`} />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.posted}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {job.applicants} applicants
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.requirements.slice(0, 4).map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                        {job.requirements.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.requirements.length - 4} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.benefits.slice(0, 3).map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                        {job.benefits.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{job.benefits.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 mt-4 lg:mt-0 lg:ml-6">
                    <Button onClick={() => handleApply(job.id)} className="w-full lg:w-auto">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full lg:w-auto bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
