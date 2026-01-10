import api from '../utils/api'

export const authAPI = {
  register: async (data) => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  login: async (data) => {
    const response = await api.post('/auth/login', data)
    return response.data
  },
}
