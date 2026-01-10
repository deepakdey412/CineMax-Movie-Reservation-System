import api from '../utils/api'

export const reservationsAPI = {
  create: async (data) => {
    const response = await api.post('/reservations', data)
    return response.data
  },

  getMyReservations: async () => {
    const response = await api.get('/reservations/my-reservations')
    return response.data
  },

  getMyUpcomingReservations: async () => {
    const response = await api.get('/reservations/my-upcoming-reservations')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/reservations/${id}`)
    return response.data
  },

  cancel: async (id) => {
    const response = await api.put(`/reservations/${id}/cancel`)
    return response.data
  },

  getAll: async () => {
    const response = await api.get('/reservations/all')
    return response.data
  },
}
