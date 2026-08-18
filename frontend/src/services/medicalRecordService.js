import api from './api'

export const medicalRecordService = {
  getByPatient:    (patientId) => api.get(`/records/${patientId}`).then(r => r.data),
  create:          (data)      => api.post('/records', data).then(r => r.data),
  getUploadUrl:    (fileName)  => api.post('/records/upload-url', { fileName }).then(r => r.data),
  getDownloadUrl:  (key)       => api.get(`/records/download-url?key=${key}`).then(r => r.data),
}

export default medicalRecordService
