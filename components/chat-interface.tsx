"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, ImageIcon, Paperclip, Shield } from "lucide-react"

interface Message {
  id: number
  sender: "user" | "other"
  content: string
  timestamp: string
  type: "text" | "image"
  imageUrl?: string
}

interface ChatInterfaceProps {
  recipientName: string
  recipientRole: string
  recipientTitle?: string
  isVerified?: boolean
  profileImage?: string
}

export default function ChatInterface({
  recipientName,
  recipientRole,
  recipientTitle,
  isVerified = false,
  profileImage,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "other",
      content: "Hi! I saw your profile and I'm interested in discussing the Senior Developer position.",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: 2,
      sender: "user",
      content: "Thank you for reaching out! I'd be happy to discuss the opportunity.",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: 3,
      sender: "other",
      content: "Great! Could you tell me more about your experience with React and Node.js?",
      timestamp: "10:35 AM",
      type: "text",
    },
    {
      id: 4,
      sender: "user",
      content:
        "I have over 5 years of experience with React and 4 years with Node.js. I've built several full-stack applications using these technologies.",
      timestamp: "10:37 AM",
      type: "text",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "user",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      setMessages([...messages, message])
      setNewMessage("")

      // Simulate typing indicator
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        // Simulate response
        const response: Message = {
          id: messages.length + 2,
          sender: "other",
          content: "That sounds great! I'd love to schedule a call to discuss this further.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "text",
        }
        setMessages((prev) => [...prev, response])
      }, 2000)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        const message: Message = {
          id: messages.length + 1,
          sender: "user",
          content: "Shared an image",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "image",
          imageUrl,
        }
        setMessages([...messages, message])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-[500px] sm:h-[600px] flex flex-col">
      <CardHeader className="border-b p-3 sm:p-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
            <AvatarImage src={profileImage || "/placeholder.svg"} />
            <AvatarFallback className="text-sm">
              {recipientName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg truncate">{recipientName}</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm text-gray-600 truncate">
                {recipientTitle ? `${recipientTitle} • ` : ""}
                {recipientRole}
              </span>
              {isVerified && (
                <Badge variant="outline" className="text-green-600 border-green-600 text-xs flex-shrink-0">
                  <Shield className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
                  <span className="hidden sm:inline">Verified</span>
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500 hidden sm:inline">Online</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-end space-x-2 max-w-[85%] sm:max-w-[70%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {message.sender === "other" && (
                  <Avatar className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0">
                    <AvatarImage src={profileImage || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {recipientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-2 sm:p-3 ${
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.type === "image" && message.imageUrl ? (
                    <div>
                      <img
                        src={message.imageUrl || "/placeholder.svg"}
                        alt="Shared image"
                        className="max-w-full h-auto rounded mb-2"
                        style={{ maxHeight: "150px" }}
                      />
                      <p className="text-xs sm:text-sm">{message.content}</p>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm">{message.content}</p>
                  )}
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end space-x-2 max-w-[85%] sm:max-w-[70%]">
                <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                  <AvatarImage src={profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {recipientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-3 sm:p-4">
          <div className="flex space-x-2">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 flex-shrink-0"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 flex-shrink-0"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={handleKeyPress}
              className="flex-1 text-sm"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()} size="sm" className="flex-shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </CardContent>
    </Card>
  )
}
