import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useJob } from "../../contexts/JobContext"
import {
  BarChart3,
  BriefcaseIcon,
  Bell,
  BookmarkIcon,
  ClockIcon,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import CountUp from "react-countup"

const CandidateDashboard = () => {
  const { currentUser } = useAuth()
  const { getApplicationsByCandidate, jobs } = useJob()
  const navigate = useNavigate()

  // Get user's applications
  const applications = getApplicationsByCandidate(currentUser.id)

  // Calculate statistics
  const totalApplications = applications.length
  const shortlistedCount = applications.filter((app) => app.status === "Shortlisted").length
  const activeApplications = applications.filter((app) => app.status === "Active").length
  const rejectedApplications = applications.filter((app) => app.status === "Rejected").length

  // Calculate success rate
  const successRate = totalApplications > 0 ? (shortlistedCount / totalApplications) * 100 : 0

  // Recent activity notifications (mock data)
  const recentActivity = [
    {
      id: 1,
      type: "application_viewed",
      message: "Your application for Frontend Developer was viewed",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "job_match",
      message: "New job match: Senior React Developer at Tech Corp",
      time: "1 day ago",
      status: "info",
    },
    {
      id: 3,
      type: "application_status",
      message: "You've been shortlisted for Backend Engineer position",
      time: "2 days ago",
      status: "success",
    },
  ]

  // Recent applications
  const recentApplications = applications.slice(0, 3)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your job search</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Applications */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Total Applications</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                <CountUp end={totalApplications} duration={2} />
              </h3>
              <p className="text-sm text-gray-500">Applications submitted</p>
            </div>
            <div className="flex items-center text-green-500">
              <span className="text-sm font-medium">+12%</span>
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
              <p className="text-sm text-gray-500">Applications shortlisted</p>
            </div>
            <div className="flex items-center text-green-500">
              <span className="text-sm font-medium">+5%</span>
            </div>
          </div>
        </div>

        {/* Active Applications */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Loader2 className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Active</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                <CountUp end={activeApplications} duration={2} />
              </h3>
              <p className="text-sm text-gray-500">Applications in review</p>
            </div>
            <div className="flex items-center text-yellow-500">
              <span className="text-sm font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Rejected</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                <CountUp end={rejectedApplications} duration={2} />
              </h3>
              <p className="text-sm text-gray-500">Applications rejected</p>
            </div>
            <div className="flex items-center text-red-500">
              <span className="text-sm font-medium">Final</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Success Rate */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Success Rate</h3>
          <div className="flex items-center justify-center">
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar
                value={successRate}
                text={`${successRate.toFixed(1)}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: `rgba(62, 152, 199, ${successRate / 100})`,
                  textColor: "#2563eb",
                  trailColor: "#d1d5db",
                })}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">
            Based on your shortlisted vs. total applications
          </p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    activity.status === "success"
                      ? "bg-green-100 text-green-600"
                      : activity.status === "info"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {activity.type === "application_viewed" ? (
                    <BriefcaseIcon className="h-4 w-4" />
                  ) : activity.type === "job_match" ? (
                    <BookmarkIcon className="h-4 w-4" />
                  ) : (
                    <Bell className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
          <div className="space-y-4">
            {recentApplications.map((application) => {
              const job = jobs.find((j) => j.id === application.jobId)
              return (
                <div
                  key={application.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{job.title}</h4>
                    <p className="text-xs text-gray-500">{job.employerName}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      application.status === "Active"
                        ? "bg-yellow-100 text-yellow-800"
                        : application.status === "Shortlisted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {application.status}
                  </div>
                </div>
              )
            })}
          </div>
          <button
            onClick={() => navigate("/candidate/applied-jobs")}
            className="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Applications
          </button>
        </div>
      </div>
    </div>
  )
}

export default CandidateDashboard