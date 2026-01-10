import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { seatsAPI } from '../api/seats'
import { showtimesAPI } from '../api/showtimes'
import { reservationsAPI } from '../api/reservations'
import toast from 'react-hot-toast'

const SeatBooking = () => {
  const { showtimeId } = useParams()
  const navigate = useNavigate()
  const [showtime, setShowtime] = useState(null)
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    fetchShowtime()
    fetchSeats()
  }, [showtimeId])

  const fetchShowtime = async () => {
    try {
      const response = await showtimesAPI.getById(showtimeId)
      if (response.success) {
        setShowtime(response.data)
      }
    } catch (error) {
      toast.error('Failed to load showtime')
    }
  }

  const fetchSeats = async () => {
    try {
      setLoading(true)
      const response = await seatsAPI.getByShowtimeId(showtimeId)
      if (response.success) {
        const sortedSeats = (response.data || []).sort((a, b) => {
          const aRow = a.seatNumber.charCodeAt(0)
          const bRow = b.seatNumber.charCodeAt(0)
          if (aRow !== bRow) return aRow - bRow
          return parseInt(a.seatNumber.slice(1)) - parseInt(b.seatNumber.slice(1))
        })
        setSeats(sortedSeats)
      }
    } catch (error) {
      toast.error('Failed to load seats')
    } finally {
      setLoading(false)
    }
  }

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber))
    } else {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat')
      return
    }

    try {
      setBooking(true)
      const response = await reservationsAPI.create({
        showtimeId: parseInt(showtimeId),
        seatNumbers: selectedSeats,
      })

      if (response.success) {
        toast.success('Reservation created successfully!')
        navigate('/my-bookings')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create reservation')
    } finally {
      setBooking(false)
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

  // Group seats by row
  const seatsByRow = {}
  seats.forEach((seat) => {
    const row = seat.seatNumber.charAt(0)
    if (!seatsByRow[row]) {
      seatsByRow[row] = []
    }
    seatsByRow[row].push(seat)
  })

  const totalPrice = selectedSeats.length * 250

  return (
    <div className="container mx-auto px-4 py-8">
      {showtime && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{showtime.movieTitle}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {new Date(showtime.startTime).toLocaleString()}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">SCREEN</p>
              <div className="h-1 bg-gray-300 dark:bg-gray-600 mt-2"></div>
            </div>

            <div className="space-y-2">
              {Object.entries(seatsByRow).map(([row, rowSeats]) => (
                <div key={row} className="flex items-center gap-2">
                  <span className="w-8 text-sm font-semibold text-gray-900 dark:text-white">{row}</span>
                  <div className="flex gap-1 flex-wrap">
                    {rowSeats.map((seat) => {
                      const isSelected = selectedSeats.includes(seat.seatNumber)
                      const isBooked = seat.isBooked

                      return (
                        <button
                          key={seat.id}
                          onClick={() => !isBooked && toggleSeat(seat.seatNumber)}
                          disabled={isBooked}
                          className={`w-10 h-10 text-xs rounded ${
                            isBooked
                              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                              : isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          {seat.seatNumber.slice(1)}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Booked</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Booking Summary</h2>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Total: ₹{totalPrice}
              </p>
            </div>
            <button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0 || booking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {booking ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatBooking
