"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import api from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token")
          localStorage.removeItem("userData")
          setCurrentUser(null)
        } else {
          // Get user data from local storage for demo
          const userData = JSON.parse(localStorage.getItem("userData") || "{}")
          setCurrentUser(userData)
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        setCurrentUser(null)
      }
    }
    setLoading(false)
  }, [])

  // Update the login function to handle the role consolidation
  const login = async (email, password) => {
    try {
      setError(null)
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login with different roles
      let userData

      if (email === "employer@example.com" || email === "recruiter@example.com") {
        // Merge recruiter and employer roles
        userData = {
          id: 1,
          name: email === "recruiter@example.com" ? "Employer (Recruiter)" : "Employer User",
          email,
          role: "employer",
          phone: "+1 (555) 123-4567",
          address: "123 Business Ave, New York, NY",
          company: email === "recruiter@example.com" ? "Talent Finders LLC" : "Tech Solutions Inc.",
          position: email === "recruiter@example.com" ? "Talent Acquisition Manager" : "HR Manager",
          specialization: email === "recruiter@example.com" ? "Tech and Engineering" : "",
          bio:
            email === "recruiter@example.com"
              ? "Helping companies find the best talent for over 5 years."
              : "Experienced HR professional with a focus on tech recruitment.",
          profileImage: null,
        }
      } else if (email === "candidate@example.com") {
        userData = {
          id: 2,
          name: "Candidate User",
          email,
          role: "candidate",
          phone: "+1 (555) 987-6543",
          address: "456 Job Seeker St, San Francisco, CA",
          skills: "JavaScript, React, Node.js",
          education: "BS Computer Science, Stanford University",
          experience: "3 years as Frontend Developer",
          bio: "Passionate developer looking for new opportunities in tech.",
          profileImage: null,
        }
      } else {
        // Default to candidate for demo
        userData = {
          id: 4,
          name: "Demo User",
          email,
          role: "candidate",
          phone: "",
          address: "",
          skills: "",
          education: "",
          experience: "",
          bio: "",
          profileImage: null,
        }
      }

      // Create a JWT token (in a real app, this would come from the server)
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(userData)) // Store user data for demo
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(userData)
      return userData
    } catch (err) {
      setError(err.message || "Failed to login")
      throw err
    }
  }

  // Update the signup function to remove recruiter role
  const signup = async (userData) => {
    try {
      setError(null)
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful signup
      const { fullName, email, password, gender, address, userType, profileImage } = userData

      // Convert any "Recruiter" userType to "Employer"
      const role = userType.toLowerCase() === "recruiter" ? "employer" : userType.toLowerCase()

      const newUser = {
        id: Math.floor(Math.random() * 1000),
        name: fullName,
        email,
        role,
        gender,
        address,
        phone: "",
        bio: "",
        profileImage: profileImage || null,
        // Role-specific fields
        ...(role === "candidate" && {
          skills: "",
          education: "",
          experience: "",
        }),
        ...(role === "employer" && {
          company: "",
          position: "",
          specialization: "", // Add specialization field for all employers
        }),
      }

      // Create a JWT token (in a real app, this would come from the server)
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(newUser)) // Store user data for demo
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(newUser)
      return newUser
    } catch (err) {
      setError(err.message || "Failed to sign up")
      throw err
    }
  }

  const updateProfile = async (updatedData) => {
    try {
      setError(null)
      // In a real app, this would be an API call
      // For demo purposes, we'll update the local state

      const updatedUser = {
        ...currentUser,
        ...updatedData,
      }

      // Update local storage for demo persistence
      localStorage.setItem("userData", JSON.stringify(updatedUser))

      setCurrentUser(updatedUser)
      return updatedUser
    } catch (err) {
      setError(err.message || "Failed to update profile")
      throw err
    }
  }

  const updateProfileImage = async (imageFile) => {
    try {
      setError(null)

      // In a real app, this would upload the image to a server
      // For demo purposes, we'll convert it to a data URL
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const imageUrl = reader.result

          // Update user data with the new image URL
          const updatedUser = {
            ...currentUser,
            profileImage: imageUrl,
          }

          // Update local storage for demo persistence
          localStorage.setItem("userData", JSON.stringify(updatedUser))

          setCurrentUser(updatedUser)
          resolve(updatedUser)
        }
        reader.onerror = reject
        reader.readAsDataURL(imageFile)
      })
    } catch (err) {
      setError(err.message || "Failed to update profile image")
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    delete api.defaults.headers.common["Authorization"]
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    updateProfileImage,
    isAuthenticated: !!currentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
