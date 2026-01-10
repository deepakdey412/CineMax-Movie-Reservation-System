import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { moviesAPI } from '../api/movies'
import toast from 'react-hot-toast'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const response = await moviesAPI.getAll(0, 100, false)
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Movies</h1>
      
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
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{movie.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{movie.genre}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{movie.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Movies
