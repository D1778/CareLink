import api from './api'

export const doctorService = {
  getAll:       ()   => api.get('/doctors').then(r => r.data),
  getById:      (id) => api.get(`/doctors/${id}`).then(r => r.data),
  getPatients:  (id) => api.get(`/doctors/${id}/patients`).then(r => r.data),
}

export default doctorService
