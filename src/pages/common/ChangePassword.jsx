import React from 'react'

function ChangePassword({ userRole }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>Password change interface for {userRole} will be implemented here</p>
      </div>
    </div>
  )
}

export default ChangePassword