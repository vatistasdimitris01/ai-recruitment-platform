"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, Shield, MessageSquare, Eye, Users, Brain, Award, MapPin, Briefcase } from "lucide-react"
import BottomNav from "@/components/bottom-nav"

interface Candidate {
  id: string
  name: string
  title: string
  location: string
  experience: string
  skills: string[]
  compositeScore: number
  iqScore: number
  matchScore: number
  isVerified: boolean
  profileImage?: string
  summary: string
  availability: "available" | "open" | "not-looking"
  salaryExpectation: string
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "available" | "top-rated" | "verified">("all")
  const [isLoading, setIsLoading] = useState(true)

  const sampleCandidates: Candidate[] = [
    {
      id: "1",
      name: "John Doe",
      title: "Senior Software Engineer",
      location: "San Francisco, CA",
      experience: "5 years",
      skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
      compositeScore: 8.7,
      iqScore: 125,
      matchScore: 96,
      isVerified: true,
      summary: "Experienced full-stack developer with expertise in modern web technologies and cloud platforms.",
      availability: "available",
      salaryExpectation: "$120k - $150k",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      title: "Frontend Developer",
      location: "Remote",
      experience: "3 years",
      skills: ["React", "Vue.js", "CSS", "JavaScript", "UI/UX"],
      compositeScore: 7.9,
      iqScore: 118,
      matchScore: 89,
      isVerified: true,
      summary: "Creative frontend developer with a passion for user experience and modern design patterns.",
      availability: "open",
      salaryExpectation: "$80k - $100k",
    },
    {
      id: "3",
      name: "Mike Chen",
      title: "Full Stack Developer",
      location: "New York, NY",
      experience: "4 years",
      skills: ["Python", "Django", "React", "PostgreSQL", "Redis"],
      compositeScore: 8.2,
      iqScore: 122,
      matchScore: 92,
      isVerified: false,
      summary: "Versatile developer with strong backend skills and growing frontend expertise.",
      availability: "available",
      salaryExpectation: "$100k - $130k",
    },
    {
      id: "4",
      name: "Emily Davis",
      title: "DevOps Engineer",
      location: "Austin, TX",
      experience: "6 years",
      skills: ["AWS", "Kubernetes", "Docker", "Terraform", "Python"],
      compositeScore: 9.1,
      iqScore: 130,
      matchScore: 94,
      isVerified: true,
      summary: "Senior DevOps engineer with extensive cloud infrastructure and automation experience.",
      availability: "not-looking",
      salaryExpectation: "$140k - $170k",
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setCandidates(sampleCandidates)
      setFilteredCandidates(sampleCandidates)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = candidates

    if (searchQuery) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedFilter !== "all") {
      filtered = filtered.filter((candidate) => {
        if (selectedFilter === "available") return candidate.availability === "available"
        if (selectedFilter === "top-rated") return candidate.compositeScore >= 8.5
        if (selectedFilter === "verified") return candidate.isVerified
        return true
      })
    }

    // Sort by match score
    filtered.sort((a, b) => b.matchScore - a.matchScore)
    setFilteredCandidates(filtered)
  }, [searchQuery, candidates, selectedFilter])

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "text-green-600 bg-green-100"
      case "open":
        return "text-yellow-600 bg-yellow-100"
      case "not-looking":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "available":
        return "Available"
      case "open":
        return "Open to offers"
      case "not-looking":
        return "Not looking"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
              <p className="text-gray-600">Discover top talent for your team</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                <Users className="mr-1 h-3 w-3" />
                {filteredCandidates.length} candidates
              </Badge>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex space-x-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates by name, skills, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2">
            {[
              { key: "all", label: "All Candidates" },
              { key: "available", label: "Available" },
              { key: "top-rated", label: "Top Rated" },
              { key: "verified", label: "Verified" },
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={selectedFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.key as any)}
                className="text-xs"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="px-4 py-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCandidates.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No candidates found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={candidate.profileImage || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{candidate.name}</h3>
                          {candidate.isVerified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <Shield className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            {candidate.matchScore}% Match
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{candidate.title}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{candidate.location}</span>
                          </div>
                          <span>• {candidate.experience} experience</span>
                        </div>

                        <p className="text-gray-700 mb-3 line-clamp-2">{candidate.summary}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {candidate.skills.slice(0, 5).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">{candidate.compositeScore}</span>
                      </div>
                      <p className="text-xs text-gray-600">Overall Rating</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Brain className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="font-semibold">{candidate.iqScore}</span>
                      </div>
                      <p className="text-xs text-gray-600">IQ Score</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="h-4 w-4 text-green-500 mr-1" />
                        <span className="font-semibold">{candidate.matchScore}%</span>
                      </div>
                      <p className="text-xs text-gray-600">Match</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Badge className={getAvailabilityColor(candidate.availability)}>
                        {getAvailabilityText(candidate.availability)}
                      </Badge>
                      <span className="text-sm font-medium text-green-600">{candidate.salaryExpectation}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Button size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
