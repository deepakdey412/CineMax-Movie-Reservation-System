import api from '../utils/api'

export const moviesAPI = {
  getAll: async (page = 0, size = 10, paginated = false) => {
    const response = await api.get('/movies', {
      params: { page, size, paginated },
    })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/movies/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/movies', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`/movies/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/movies/${id}`)
    return response.data
  },
}
