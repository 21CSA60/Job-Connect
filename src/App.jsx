import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { JobProvider } from "./contexts/JobContext"
import ProtectedRoute from "./components/common/ProtectedRoute"

// Public Pages
import Home from "./pages/Home"
import AllJobs from "./pages/AllJobs"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import JobDetails from "./pages/JobDetails"

// Candidate Pages
import CandidateDashboard from "./pages/candidate/CandidateDashboard"
import CandidateProfile from "./pages/candidate/CandidateProfile"
import CandidateResume from "./pages/candidate/CandidateResume"
import AppliedJobs from "./pages/candidate/AppliedJobs"
import JobAlerts from "./pages/candidate/JobAlerts"
import ShortlistedJobs from "./pages/candidate/ShortlistedJobs"
import ChangePassword from "./pages/common/ChangePassword.jsx"
import ViewProfile from "./pages/common/ViewProfile"

// Employer Pages
import EmployerDashboard from "./pages/employer/EmployerDashboard"
import EmployerProfile from "./pages/employer/EmployerProfile"
import CreateJobPost from "./pages/employer/CreateJobPost.jsx"
import ManageJobs from "./pages/employer/ManageJobs"
import AllApplicants from "./pages/employer/AllApplicants"
import ShortlistedCandidates from "./pages/employer/ShortlistedCandidates"
import ResumeAlerts from "./pages/employer/ResumeAlerts"

// Layout
import Layout from "./components/layout/Layout"

function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<AllJobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Candidate Routes */}
              <Route
                path="/candidate/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <CandidateDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/profile"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <CandidateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/resume"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <CandidateResume />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/applied-jobs"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <AppliedJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/job-alerts"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <JobAlerts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/shortlisted-jobs"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <ShortlistedJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/change-password"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <ChangePassword userRole="candidate" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidate/view-profile"
                element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <ViewProfile userRole="candidate" />
                  </ProtectedRoute>
                }
              />

              {/* Employer Routes */}
              <Route
                path="/employer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <EmployerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/profile"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <EmployerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/create-job"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <CreateJobPost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/manage-jobs"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ManageJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/all-applicants"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <AllApplicants />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/shortlisted-candidates"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ShortlistedCandidates />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/resume-alerts"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ResumeAlerts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/change-password"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ChangePassword userRole="employer" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/view-profile"
                element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <ViewProfile userRole="employer" />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </JobProvider>
      </AuthProvider>
    </Router>
  )
}

export default App