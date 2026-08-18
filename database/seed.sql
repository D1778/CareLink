-- ═══════════════════════════════════════════════════════
-- CareLink Seed Data
-- ═══════════════════════════════════════════════════════

-- Users (passwords are bcrypt hash of 'demo123')
INSERT INTO users (id, name, email, password_hash, phone, role, status) VALUES
('U001', 'Alex Johnson',   'patient@care.com', '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234', '+1-555-0101', 'PATIENT', 'active'),
('U002', 'Maria Garcia',   'maria@example.com','$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234', '+1-555-0102', 'PATIENT', 'active'),
('U003', 'Robert Smith',   'robert@example.com','$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234','+1-555-0103', 'PATIENT', 'active'),
('U004', 'Dr. Sarah Chen', 'doctor@care.com',  '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234', '+1-555-0201', 'DOCTOR', 'active'),
('U005', 'Dr. Mike Ross',  'mike@care.com',    '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234', '+1-555-0202', 'DOCTOR', 'active'),
('U006', 'Admin User',     'admin@care.com',   '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234', '+1-555-0301', 'ADMIN', 'active')
ON CONFLICT DO NOTHING;

-- Doctors
INSERT INTO doctors (id, user_id, specialty, license_number, hospital, available) VALUES
('D001', 'U004', 'Cardiology',       'LIC-CARDIO-001', 'CareLink Medical Center', TRUE),
('D002', 'U005', 'General Practice', 'LIC-GP-002',     'CareLink Medical Center', TRUE)
ON CONFLICT DO NOTHING;

-- Patients
INSERT INTO patients (id, user_id, date_of_birth, blood_type, emergency_contact, primary_doctor_id) VALUES
('P001', 'U001', '1991-03-15', 'A+', 'Jane Johnson +1-555-9101', 'D001'),
('P002', 'U002', '1967-07-22', 'B-', 'Carlos Garcia +1-555-9102', 'D002'),
('P003', 'U003', '1958-11-08', 'O+', 'Linda Smith +1-555-9103', 'D001')
ON CONFLICT DO NOTHING;

-- Appointments
INSERT INTO appointments (id, patient_id, doctor_id, type, scheduled_at, status, notes) VALUES
('A001', 'P001', 'D001', 'Cardiology Follow-up', '2025-08-22 10:00:00', 'confirmed', 'Regular check after medication adjustment'),
('A002', 'P002', 'D002', 'Diabetes Review',       '2025-08-22 14:00:00', 'pending',   'HbA1c review and diet consultation'),
('A003', 'P003', 'D001', 'Urgent Review',          '2025-08-23 09:00:00', 'confirmed', 'Heart failure monitoring'),
('A004', 'P001', 'D002', 'General Check-up',       '2025-08-25 14:00:00', 'scheduled', NULL),
('A005', 'P002', 'D001', 'Cardiology Consult',     '2025-08-20 11:00:00', 'completed', 'Discussed blood pressure management')
ON CONFLICT DO NOTHING;

-- Prescriptions
INSERT INTO prescriptions (id, patient_id, doctor_id, medicine, dosage, frequency, start_date, end_date, instructions, status) VALUES
('RX001', 'P001', 'D001', 'Lisinopril',   '10mg',  'Once daily (morning)', '2025-08-01', '2025-12-31', 'Take with water', 'active'),
('RX002', 'P001', 'D001', 'Aspirin',      '81mg',  'Once daily (morning)', '2025-08-01', '2025-12-31', 'Take with food', 'active'),
('RX003', 'P002', 'D002', 'Metformin',    '500mg', 'Twice daily (meals)',  '2025-08-10', '2025-11-10', 'During meals', 'active'),
('RX004', 'P003', 'D001', 'Furosemide',   '40mg',  'Twice daily',          '2025-08-18', '2025-09-18', 'Monitor potassium', 'active'),
('RX005', 'P003', 'D001', 'Carvedilol',   '12.5mg','Twice daily',          '2025-08-18', '2025-11-18', 'Take with food', 'active')
ON CONFLICT DO NOTHING;

-- Medical Records
INSERT INTO medical_records (id, patient_id, doctor_id, type, title, s3_key, notes) VALUES
('REC001', 'P001', 'D001', 'Lab Report', 'Complete Blood Count (CBC)',   'records/P001/CBC-2025-08-15.pdf', 'WBC, RBC, Platelets within normal range'),
('REC002', 'P001', 'D001', 'Doctor Notes', 'Cardiology Follow-up Notes', 'records/P001/notes-2025-08-15.pdf', 'Patient stable, continue current medications'),
('REC003', 'P002', 'D002', 'Lab Report', 'HbA1c Blood Sugar Level',     'records/P002/HbA1c-2025-07-30.pdf', 'HbA1c at 7.2%, target <7%'),
('REC004', 'P003', 'D001', 'Imaging',    'Chest X-Ray Report',          'records/P003/xray-2025-08-18.pdf',  'Mild cardiomegaly, no acute changes')
ON CONFLICT DO NOTHING;
