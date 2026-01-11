import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { moviesAPI } from '../api/movies'
import toast from 'react-hot-toast'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const response = await moviesAPI.getAll(0, 6, false)
      if (response.success) {
        setMovies(response.data || [])
      }
    } catch (error) {
      toast.error('Failed to load movies')
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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to CineMax📽️
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Book your favorite movie tickets in just a few clicks
        </p>
      </div>

      <div className="mb-8 text-center">
        <Link
          to="/movies"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Browse All Movies
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Movies</h2>
        {movies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No movies available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={movie.posterUrl || 'https://via.placeholder.com/300x450'}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{movie.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{movie.genre}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{movie.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
