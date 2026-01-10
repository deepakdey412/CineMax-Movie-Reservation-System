import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { moviesAPI } from '../api/movies'
import { showtimesAPI } from '../api/showtimes'
import toast from 'react-hot-toast'

const MovieDetail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [showtimes, setShowtimes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovie()
    fetchShowtimes()
  }, [id])

  const fetchMovie = async () => {
    try {
      const response = await moviesAPI.getById(id)
      if (response.success) {
        setMovie(response.data)
      }
    } catch (error) {
      toast.error('Failed to load movie details')
    }
  }

  const fetchShowtimes = async () => {
    try {
      const response = await showtimesAPI.getByMovieId(id)
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

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Movie not found</p>
          <Link to="/movies" className="text-blue-600 hover:text-blue-500 mt-4 inline-block">
            Back to Movies
          </Link>
        </div>
      </div>
    )
  }

  const upcomingShowtimes = showtimes.filter(
    (st) => new Date(st.startTime) > new Date()
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={movie.posterUrl || 'https://via.placeholder.com/400x600'}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{movie.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            <span className="font-semibold">Genre:</span> {movie.genre}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-8">{movie.description}</p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Available Showtimes</h2>
            {upcomingShowtimes.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No upcoming showtimes available</p>
            ) : (
              <div className="space-y-4">
                {upcomingShowtimes.map((showtime) => (
                  <div
                    key={showtime.id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {new Date(showtime.startTime).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Available Seats: {showtime.availableSeats} / {showtime.totalSeats}
                        </p>
                      </div>
                      <Link
                        to={`/booking/${showtime.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
