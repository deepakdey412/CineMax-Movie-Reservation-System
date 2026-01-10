import api from '../utils/api'

export const showtimesAPI = {
  getAll: async () => {
    const response = await api.get('/showtimes')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/showtimes/${id}`)
    return response.data
  },

  getByMovieId: async (movieId) => {
    const response = await api.get(`/showtimes/movie/${movieId}`)
    return response.data
  },

  getByMovieIdAndDate: async (movieId, date) => {
    const response = await api.get(`/showtimes/movie/${movieId}/date`, {
      params: { date },
    })
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/showtimes', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`/showtimes/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/showtimes/${id}`)
    return response.data
  },
}
