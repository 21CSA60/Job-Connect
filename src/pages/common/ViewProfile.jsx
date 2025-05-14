import React from 'react'

function ViewProfile({ userRole }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">View Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>Public profile view for {userRole} will be implemented here</p>
      </div>
    </div>
  )
}

export default ViewProfile