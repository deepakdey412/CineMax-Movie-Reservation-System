import { useEffect, useState } from 'react'
import { showtimesAPI } from '../../api/showtimes'
import { moviesAPI } from '../../api/movies'
import toast from 'react-hot-toast'

const AdminShowtimes = () => {
  const [showtimes, setShowtimes] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingShowtime, setEditingShowtime] = useState(null)
  const [formData, setFormData] = useState({
    movieId: '',
    startTime: '',
    endTime: '',
    totalSeats: '',
  })

  useEffect(() => {
    fetchShowtimes()
    fetchMovies()
  }, [])

  const fetchShowtimes = async () => {
    try {
      setLoading(true)
      const response = await showtimesAPI.getAll()
      if (response.success) {
        setShowtimes(response.data || [])
      }
    } catch (error) {
      toast.error('Failed to load showtimes')
    } finally {
      setLoading(false)
    }
  }

  const fetchMovies = async () => {
    try {
      const response = await moviesAPI.getAll(0, 100, false)
      if (response.success) {
        setMovies(response.data || [])
      }
    } catch (error) {
      toast.error('Failed to load movies')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        movieId: parseInt(formData.movieId),
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        totalSeats: parseInt(formData.totalSeats),
      }

      let response
      if (editingShowtime) {
        response = await showtimesAPI.update(editingShowtime.id, payload)
        toast.success('Showtime updated successfully')
      } else {
        response = await showtimesAPI.create(payload)
        toast.success('Showtime created successfully')
      }
      if (response.success) {
        setShowModal(false)
        setEditingShowtime(null)
        setFormData({ movieId: '', startTime: '', endTime: '', totalSeats: '' })
        fetchShowtimes()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleEdit = (showtime) => {
    setEditingShowtime(showtime)
    setFormData({
      movieId: showtime.movieId.toString(),
      startTime: new Date(showtime.startTime).toISOString().slice(0, 16),
      endTime: new Date(showtime.endTime).toISOString().slice(0, 16),
      totalSeats: showtime.totalSeats.toString(),
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this showtime?')) {
      return
    }
    try {
      const response = await showtimesAPI.delete(id)
      if (response.success) {
        toast.success('Showtime deleted successfully')
        fetchShowtimes()
      }
    } catch (error) {
      toast.error('Failed to delete showtime')
    }
  }

  const openModal = () => {
    setEditingShowtime(null)
    setFormData({ movieId: '', startTime: '', endTime: '', totalSeats: '' })
    setShowModal(true)
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Showtimes</h1>
        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add Showtime
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {editingShowtime ? 'Edit Showtime' : 'Add Showtime'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Movie
                </label>
                <select
                  name="movieId"
                  value={formData.movieId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a movie</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Total Seats
                </label>
                <input
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  {editingShowtime ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingShowtime(null)
                  }}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {showtimes.map((showtime) => (
          <div key={showtime.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {showtime.movieTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Start:</strong> {new Date(showtime.startTime).toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  <strong>End:</strong> {new Date(showtime.endTime).toLocaleString()}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Total Seats:</strong> {showtime.totalSeats}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Available:</strong> {showtime.availableSeats}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(showtime)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(showtime.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminShowtimes
