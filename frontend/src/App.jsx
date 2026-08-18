import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home               from './pages/Home'
import Login              from './pages/Login'
import Register           from './pages/Register'
import PatientDashboard   from './pages/PatientDashboard'
import PatientVitals      from './pages/PatientVitals'
import PatientRecords     from './pages/PatientRecords'
import PatientPrescriptions from './pages/PatientPrescriptions'
import PatientAppointments from './pages/PatientAppointments'
import DoctorDashboard    from './pages/DoctorDashboard'
import DoctorPatients     from './pages/DoctorPatients'
import DoctorPatientDetails from './pages/DoctorPatientDetails'
import DoctorAppointments from './pages/DoctorAppointments'
import DoctorPrescriptions from './pages/DoctorPrescriptions'
import AdminDashboard     from './pages/AdminDashboard'
import AdminUsers         from './pages/AdminUsers'
import AdminReports       from './pages/AdminReports'
import Teleconsultation   from './pages/Teleconsultation'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Patient */}
          <Route path="/patient" element={<ProtectedRoute role="PATIENT" />}>
            <Route path="dashboard"     element={<PatientDashboard />} />
            <Route path="vitals"        element={<PatientVitals />} />
            <Route path="records"       element={<PatientRecords />} />
            <Route path="prescriptions" element={<PatientPrescriptions />} />
            <Route path="appointments"  element={<PatientAppointments />} />
            <Route path="teleconsult"   element={<Teleconsultation />} />
          </Route>

          {/* Doctor */}
          <Route path="/doctor" element={<ProtectedRoute role="DOCTOR" />}>
            <Route path="dashboard"     element={<DoctorDashboard />} />
            <Route path="patients"      element={<DoctorPatients />} />
            <Route path="patients/:id"  element={<DoctorPatientDetails />} />
            <Route path="appointments"  element={<DoctorAppointments />} />
            <Route path="prescriptions" element={<DoctorPrescriptions />} />
            <Route path="teleconsult"   element={<Teleconsultation />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute role="ADMIN" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users"     element={<AdminUsers />} />
            <Route path="reports"   element={<AdminReports />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
