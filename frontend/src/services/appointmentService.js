import api from './api'

export const appointmentService = {
  getAll:    ()         => api.get('/appointments').then(r => r.data),
  getById:   (id)       => api.get(`/appointments/${id}`).then(r => r.data),
  create:    (data)     => api.post('/appointments', data).then(r => r.data),
  update:    (id, data) => api.put(`/appointments/${id}`, data).then(r => r.data),
  cancel:    (id)       => api.delete(`/appointments/${id}`).then(r => r.data),
}

export default appointmentService
