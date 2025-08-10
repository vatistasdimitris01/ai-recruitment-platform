"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Send,
  Star,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  ArrowLeft,
  User,
  MapPin,
  Briefcase,
  UserPlus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  text: string
  timestamp: string
  isFromMe: boolean
  status?: "sent" | "delivered" | "read"
}

interface Conversation {
  id: string
  candidateName: string
  position: string
  experience: string
  location: string
  skills: string[]
  avatar: string
  isOnline: boolean
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isStarred: boolean
  matchScore: number
  messages: Message[]
}

export default function EmployerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const conversations: Conversation[] = [
    {
      id: "1",
      candidateName: "Alex Thompson",
      position: "Senior Frontend Developer",
      experience: "5 years",
      location: "San Francisco, CA",
      skills: ["React", "TypeScript", "Node.js"],
      avatar: "/placeholder.svg?height=40&width=40&text=AT",
      isOnline: true,
      lastMessage: "Thank you for reaching out! I'm very interested in the position and would love to learn more.",
      lastMessageTime: "5 min ago",
      unreadCount: 1,
      isStarred: true,
      matchScore: 95,
      messages: [
        {
          id: "1",
          text: "Hi Alex! I saw your application for the Senior Frontend Developer position. Your experience with React and TypeScript looks impressive!",
          timestamp: "10:30 AM",
          isFromMe: true,
          status: "read",
        },
        {
          id: "2",
          text: "Thank you for reaching out! I'm very interested in the position and would love to learn more about the team and projects.",
          timestamp: "10:45 AM",
          isFromMe: false,
        },
        {
          id: "3",
          text: "Great! We're working on some exciting projects involving React, Next.js, and GraphQL. The team is collaborative and we value innovation.",
          timestamp: "11:00 AM",
          isFromMe: true,
          status: "read",
        },
        {
          id: "4",
          text: "That sounds amazing! I have extensive experience with all those technologies. When would be a good time to discuss this further?",
          timestamp: "11:15 AM",
          isFromMe: false,
        },
      ],
    },
    {
      id: "2",
      candidateName: "Maria Garcia",
      position: "UX Designer",
      experience: "4 years",
      location: "Remote",
      skills: ["Figma", "Sketch", "Prototyping"],
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
      isOnline: false,
      lastMessage: "I'd be happy to show you my portfolio during our call.",
      lastMessageTime: "2 hours ago",
      unreadCount: 0,
      isStarred: false,
      matchScore: 88,
      messages: [
        {
          id: "1",
          text: "Hello Maria! Your design portfolio is outstanding. We'd love to discuss the UX Designer role with you.",
          timestamp: "Yesterday 3:30 PM",
          isFromMe: true,
          status: "read",
        },
        {
          id: "2",
          text: "Thank you so much! I'm excited about the opportunity. Could you tell me more about the design challenges you're facing?",
          timestamp: "Yesterday 4:00 PM",
          isFromMe: false,
        },
        {
          id: "3",
          text: "I'd be happy to show you my portfolio during our call.",
          timestamp: "2 hours ago",
          isFromMe: false,
        },
      ],
    },
    {
      id: "3",
      candidateName: "David Kim",
      position: "Full Stack Engineer",
      experience: "6 years",
      location: "New York, NY",
      skills: ["Python", "Django", "React"],
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      isOnline: true,
      lastMessage: "Looking forward to the technical interview!",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      isStarred: false,
      matchScore: 92,
      messages: [
        {
          id: "1",
          text: "Hi David! We're impressed by your full-stack experience. Would you be interested in a technical interview?",
          timestamp: "1 day ago",
          isFromMe: true,
          status: "read",
        },
        {
          id: "2",
          text: "Looking forward to the technical interview!",
          timestamp: "1 day ago",
          isFromMe: false,
        },
      ],
    },
  ]

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const currentConversation = conversations.find((conv) => conv.id === selectedConversation)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    // In a real app, this would send the message to the server
    console.log("Sending message:", newMessage)
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleAddToPipeline = (candidateId: string) => {
    console.log("Adding candidate to pipeline:", candidateId)
    // In a real app, this would add the candidate to the hiring pipeline
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
          {/* Conversations List */}
          <div className={`lg:w-1/3 ${selectedConversation ? "hidden lg:block" : "block"}`}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Candidate Messages</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[calc(100vh-16rem)] overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                        selectedConversation === conversation.id ? "bg-blue-50 border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={conversation.avatar || "/placeholder.svg"}
                              alt={conversation.candidateName}
                            />
                            <AvatarFallback>
                              {conversation.candidateName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900 truncate">{conversation.candidateName}</h3>
                              {conversation.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {conversation.matchScore}% match
                              </Badge>
                              <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                              {conversation.unreadCount > 0 && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Briefcase className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600 truncate">{conversation.position}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{conversation.experience} experience</span>
                            <span className="text-xs text-gray-400">•</span>
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{conversation.location}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {conversation.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {conversation.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{conversation.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className={`lg:w-2/3 ${selectedConversation ? "block" : "hidden lg:block"}`}>
            {currentConversation ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden"
                        onClick={() => setSelectedConversation(null)}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={currentConversation.avatar || "/placeholder.svg"}
                            alt={currentConversation.candidateName}
                          />
                          <AvatarFallback>
                            {currentConversation.candidateName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {currentConversation.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{currentConversation.candidateName}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{currentConversation.position}</span>
                          <span>•</span>
                          <span>{currentConversation.experience}</span>
                          <span>•</span>
                          <Badge variant="secondary" className="text-xs">
                            {currentConversation.matchScore}% match
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleAddToPipeline(currentConversation.id)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add to Pipeline
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Star className="h-4 w-4 mr-2" />
                            {currentConversation.isStarred ? "Unstar" : "Star"} Candidate
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Full Profile</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {currentConversation.messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isFromMe ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isFromMe ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className={`text-xs ${message.isFromMe ? "text-blue-100" : "text-gray-500"}`}>
                              {message.timestamp}
                            </span>
                            {message.isFromMe && message.status && (
                              <span className="text-xs text-blue-100 ml-2">
                                {message.status === "read"
                                  ? "Read"
                                  : message.status === "delivered"
                                    ? "Delivered"
                                    : "Sent"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="min-h-[40px] max-h-32 resize-none"
                        rows={1}
                      />
                    </div>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a candidate</h3>
                  <p className="text-gray-600">Choose a candidate from the list to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
