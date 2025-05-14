"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { useAuth } from "./AuthContext"

const JobContext = createContext()

export const useJob = () => useContext(JobContext)

export const JobProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data for jobs
  useEffect(() => {
    const mockJobs = [
      {
        id: 1,
        title: "Frontend Developer",
        type: "Full-time",
        location: "New York, NY",
        salary: "$80,000 - $100,000",
        description: "We are looking for a skilled Frontend Developer to join our team...",
        employerId: 1,
        employerName: "Tech Solutions Inc.",
        createdAt: "2023-05-15",
        questions: ["Are you willing to relocate?", "Do you have experience with React?"],
      },
      {
        id: 2,
        title: "Backend Engineer",
        type: "Full-time",
        location: "Remote",
        salary: "$90,000 - $120,000",
        description: "Join our engineering team to build scalable backend systems...",
        employerId: 1,
        employerName: "Tech Solutions Inc.",
        createdAt: "2023-05-10",
        questions: ["Do you have experience with Node.js?", "Are you familiar with database design?"],
      },
      {
        id: 3,
        title: "UX Designer",
        type: "Part-time",
        location: "San Francisco, CA",
        salary: "$60,000 - $80,000",
        description: "Looking for a creative UX Designer to improve our product experience...",
        employerId: 2,
        employerName: "Design Masters",
        createdAt: "2023-05-05",
        questions: ["Do you have a portfolio?", "What design tools do you use?"],
      },
      {
        id: 4,
        title: "DevOps Engineer",
        type: "Full-time",
        location: "Austin, TX",
        salary: "$100,000 - $130,000",
        description: "Help us build and maintain our cloud infrastructure...",
        employerId: 1,
        employerName: "Tech Solutions Inc.",
        createdAt: "2023-05-01",
        questions: ["Do you have experience with AWS?", "Are you familiar with CI/CD pipelines?"],
      },
      {
        id: 5,
        title: "Product Manager",
        type: "Full-time",
        location: "Chicago, IL",
        salary: "$110,000 - $140,000",
        description: "Lead our product development efforts and drive innovation...",
        employerId: 3,
        employerName: "Innovate Co.",
        createdAt: "2023-04-28",
        questions: ["Have you managed technical products before?", "How do you prioritize features?"],
      },
    ]

    const mockApplications = [
      {
        id: 1,
        jobId: 1,
        candidateId: 2,
        candidateName: "Jane Smith",
        status: "Active",
        resumeUrl: "https://example.com/resume1.pdf",
        appliedAt: "2023-05-16",
        answers: ["Yes", "Yes, 3 years"],
      },
      {
        id: 2,
        jobId: 2,
        candidateId: 2,
        candidateName: "Jane Smith",
        status: "Rejected",
        resumeUrl: "https://example.com/resume1.pdf",
        appliedAt: "2023-05-12",
        answers: ["Yes", "Yes, MongoDB and PostgreSQL"],
      },
      {
        id: 3,
        jobId: 3,
        candidateId: 4,
        candidateName: "Alex Johnson",
        status: "Shortlisted",
        resumeUrl: "https://example.com/resume2.pdf",
        appliedAt: "2023-05-07",
        answers: ["Yes, available at example.com/portfolio", "Figma and Sketch"],
      },
    ]

    setJobs(mockJobs)
    setApplications(mockApplications)
    setLoading(false)
  }, [])

  const getJobById = (id) => {
    return jobs.find((job) => job.id === Number.parseInt(id))
  }

  const getJobsByEmployer = (employerId) => {
    return jobs.filter((job) => job.employerId === employerId)
  }

  const getApplicationsByJob = (jobId) => {
    return applications.filter((app) => app.jobId === Number.parseInt(jobId))
  }

  const getApplicationsByCandidate = (candidateId) => {
    return applications.filter((app) => app.candidateId === candidateId)
  }

  const createJob = (jobData) => {
    const newJob = {
      id: jobs.length + 1,
      ...jobData,
      employerId: currentUser.id,
      employerName: currentUser.name,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setJobs([...jobs, newJob])
    return newJob
  }

  const applyForJob = (jobId, applicationData) => {
    const newApplication = {
      id: applications.length + 1,
      jobId: Number.parseInt(jobId),
      candidateId: currentUser.id,
      candidateName: currentUser.name,
      status: "Active",
      appliedAt: new Date().toISOString().split("T")[0],
      ...applicationData,
    }
    setApplications([...applications, newApplication])
    return newApplication
  }

  const updateApplicationStatus = (applicationId, status) => {
    const updatedApplications = applications.map((app) => (app.id === applicationId ? { ...app, status } : app))
    setApplications(updatedApplications)
  }

  const value = {
    jobs,
    applications,
    loading,
    error,
    getJobById,
    getJobsByEmployer,
    getApplicationsByJob,
    getApplicationsByCandidate,
    createJob,
    applyForJob,
    updateApplicationStatus,
  }

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>
}
