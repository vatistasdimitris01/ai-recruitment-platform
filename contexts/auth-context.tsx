"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  role: "applicant" | "employer"
  profile?: any
  isVerified?: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "applicant" | "employer") => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateProfile: (profileData: any) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = async (email: string, password: string, role: "applicant" | "employer") => {
    // Simulate login with proper role assignment
    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role, // Make sure the role is correctly assigned
      isVerified: true,
    }

    console.log("Logging in user with role:", role) // Debug log

    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const register = async (userData: any) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      role: userData.role, // Make sure role is preserved from registration
      isVerified: false,
      profile: userData.profile || {},
    }

    console.log("Registering user with role:", newUser.role) // Debug log

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = (profileData: any) => {
    if (user) {
      const updatedUser = { ...user, profile: { ...user.profile, ...profileData } }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
