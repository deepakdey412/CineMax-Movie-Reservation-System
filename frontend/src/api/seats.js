import api from '../utils/api'

export const seatsAPI = {
  getByShowtimeId: async (showtimeId) => {
    const response = await api.get(`/seats/showtime/${showtimeId}`)
    return response.data
  },
}
