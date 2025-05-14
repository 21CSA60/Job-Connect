import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useJob } from "../../contexts/JobContext"
import {
  Users,
  BriefcaseIcon,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Building,
  MapPin,
  DollarSign,
} from "lucide-react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import CountUp from "react-countup"

const EmployerDashboard = () => {
  const { currentUser } = useAuth()
  const { jobs, applications } = useJob()
  const navigate = useNavigate()

  // Filter jobs and applications for current employer
  const employerJobs = jobs.filter((job) => job.employerId === currentUser.id)
  const employerApplications = applications.filter((app) =>
    employerJobs.some((job) => job.id === app.jobId),
  )

  // Calculate statistics
  const totalJobs = employerJobs.length
  const totalApplications = employerApplications.length
  const shortlistedCount = employerApplications.filter((app) => app.status === "Shortlisted").length
  const activeApplications = employerApplications.filter((app) => app.status === "Active").length

  // Calculate response rate
  const responseRate = totalApplications > 0 ? ((shortlistedCount + activeApplications) / totalApplications) * 100 : 0

  // Recent applicants (last 5)
  const recentApplicants = employerApplications.slice(0, 5)

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "application",
      message: "New application received for Frontend Developer position",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "shortlist",
      message: "You shortlisted a candidate for Backend Engineer position",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "job_post",
      message: "Your job post for UI/UX Designer is about to expire",
      time: "2 days ago",
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your job postings</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Jobs */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Active Jobs</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                <CountUp end={totalJobs} duration={2} />
              </h3>
              <p className="text-sm text-gray-500">Total job postings</p>
            </div>
            <div className="flex items-center text-green-500">
              <span className="text-sm font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Total Applications */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Applications</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                <CountUp end={totalApplications} duration={2} />
              </h3>
              <p className="text-sm text-gray-500">Total applications</p>
            </div>
            <div className="flex items-center text-purple-500">
              <span className="text-sm font-medium">+8%</span>
            </div>
          </div>
        </div>

        {/* Shortlisted */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Shortlisted</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                <CountUp end={shortlistedCount} duration={2} />
              </h3>
              <p className="text-sm text-gray-500">Candidates shortlisted</p>
            </div>
            <div className="flex items-center text-green-500">
              <span className="text-sm font-medium">+12%</span>
            </div>
          </div>
        </div>

        {/* Pending Review */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Pending Review</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                <CountUp end={activeApplications} duration={2} />
              </h3>
              <p className="text-sm text-gray-500">Applications to review</p>
            </div>
            <div className="flex items-center text-yellow-500">
              <span className="text-sm font-medium">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Response Rate */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Response Rate</h3>
          <div className="flex items-center justify-center">
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar
                value={responseRate}
                text={`${responseRate.toFixed(1)}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: `rgba(62, 152, 199, ${responseRate / 100})`,
                  textColor: "#2563eb",
                  trailColor: "#d1d5db",
                })}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">
            Based on your response to received applications
          </p>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    notification.type === "application"
                      ? "bg-blue-100 text-blue-600"
                      : notification.type === "shortlist"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {notification.type === "application" ? (
                    <Users className="h-4 w-4" />
                  ) : notification.type === "shortlist" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applicants</h3>
          <div className="space-y-4">
            {recentApplicants.map((applicant) => {
              const job = jobs.find((j) => j.id === applicant.jobId)
              return (
                <div
                  key={applicant.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/employer/review/${applicant.id}`)}
                >
                  <div className="flex-shrink-0">
                    {applicant.profileImage ? (
                      <img
                        src={applicant.profileImage}
                        alt={applicant.candidateName}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {applicant.candidateName[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">{applicant.candidateName}</h4>
                    <p className="text-xs text-gray-500">Applied for {job.title}</p>
                    <div
                      className={`mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        applicant.status === "Active"
                          ? "bg-yellow-100 text-yellow-800"
                          : applicant.status === "Shortlisted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {applicant.status}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              )
            })}
          </div>
          <button
            onClick={() => navigate("/employer/all-applicants")}
            className="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Applicants
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployerDashboard