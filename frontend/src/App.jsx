import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

// Layout
import Layout from './components/Layout'
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Showtimes from './pages/Showtimes'
import SeatBooking from './pages/SeatBooking'
import MyBookings from './pages/MyBookings'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminMovies from './pages/admin/Movies'
import AdminShowtimes from './pages/admin/Showtimes'
import AdminReports from './pages/admin/Reports'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/showtimes/:movieId" element={<Showtimes />} />
        <Route path="/booking/:showtimeId" element={<ProtectedRoute><SeatBooking /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/movies" element={<ProtectedRoute requireAdmin><AdminMovies /></ProtectedRoute>} />
        <Route path="/admin/showtimes" element={<ProtectedRoute requireAdmin><AdminShowtimes /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute requireAdmin><AdminReports /></ProtectedRoute>} />
      </Routes>
    </Layout>
  )
}

export default App
