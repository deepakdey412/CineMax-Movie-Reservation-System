import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { showtimesAPI } from '../api/showtimes'
import { moviesAPI } from '../api/movies'
import toast from 'react-hot-toast'

const Showtimes = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [showtimes, setShowtimes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovie()
    fetchShowtimes()
  }, [movieId])

  const fetchMovie = async () => {
    try {
      const response = await moviesAPI.getById(movieId)
      if (response.success) {
        setMovie(response.data)
      }
    } catch (error) {
      toast.error('Failed to load movie')
    }
  }

  const fetchShowtimes = async () => {
    try {
      const response = await showtimesAPI.getByMovieId(movieId)
      if (response.success) {
        setShowtimes(response.data || [])
      }
    } catch (error) {
      toast.error('Failed to load showtimes')
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

  const upcomingShowtimes = showtimes.filter(
    (st) => new Date(st.startTime) > new Date()
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {movie && (
        <div className="mb-8">
          <Link to={`/movies/${movie.id}`} className="text-blue-600 hover:text-blue-500 mb-4 inline-block">
            ← Back to {movie.title}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Showtimes for {movie.title}</h1>
        </div>
      )}

      {upcomingShowtimes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No upcoming showtimes available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingShowtimes.map((showtime) => (
            <div
              key={showtime.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <p className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                {new Date(showtime.startTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Ends: {new Date(showtime.endTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Available: {showtime.availableSeats} / {showtime.totalSeats} seats
              </p>
              <Link
                to={`/booking/${showtime.id}`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-md"
              >
                Select Seats
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Showtimes
