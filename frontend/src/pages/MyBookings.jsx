import { useEffect, useState } from 'react'
import { reservationsAPI } from '../api/reservations'
import toast from 'react-hot-toast'

const MyBookings = () => {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      setLoading(true)
      const response = await reservationsAPI.getMyReservations()
      if (response.success) {
        setReservations(response.data || [])
      }
    } catch (error) {
      toast.error('Failed to load reservations')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) {
      return
    }

    try {
      const response = await reservationsAPI.cancel(id)
      if (response.success) {
        toast.success('Reservation cancelled successfully')
        fetchReservations()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel reservation')
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Bookings</h1>

      {reservations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No reservations found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation) => {
            const isUpcoming = new Date(reservation.showtimeStart) > new Date()

            return (
              <div
                key={reservation.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {reservation.movieTitle}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Showtime:</strong>{' '}
                      {new Date(reservation.showtimeStart).toLocaleString()} -{' '}
                      {new Date(reservation.showtimeEnd).toLocaleString()}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Seats:</strong> {reservation.seatNumbers.join(', ')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Total Price:</strong> ₹{reservation.totalPrice}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Booked on: {new Date(reservation.reservationDate).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    {isUpcoming && !reservation.isCancelled && (
                      <button
                        onClick={() => handleCancel(reservation.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Cancel
                      </button>
                    )}
                    {reservation.isCancelled && (
                      <span className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm">
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyBookings
