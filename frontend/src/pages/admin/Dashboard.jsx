import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { reportsAPI } from '../../api/reports'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const [reports, setReports] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setLoading(true)
      const response = await reportsAPI.getReports()
      if (response.success) {
        setReports(response.data)
      }
    } catch (error) {
      toast.error('Failed to load reports')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/admin/movies"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Manage Movies</h2>
          <p className="text-gray-600 dark:text-gray-400">Add, edit, or delete movies</p>
        </Link>
        <Link
          to="/admin/showtimes"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Manage Showtimes</h2>
          <p className="text-gray-600 dark:text-gray-400">Create and manage showtimes</p>
        </Link>
        <Link
          to="/admin/reports"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">View Reports</h2>
          <p className="text-gray-600 dark:text-gray-400">Revenue and occupancy reports</p>
        </Link>
      </div>

      {reports && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Total Reservations:</strong> {reports.totalReservations}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Total Revenue:</strong> ₹{reports.totalRevenue?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
