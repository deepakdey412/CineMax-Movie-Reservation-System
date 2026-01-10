import api from '../utils/api'

export const reportsAPI = {
  getReports: async () => {
    const response = await api.get('/admin/reports')
    return response.data
  },
}
