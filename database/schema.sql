-- ═══════════════════════════════════════════════════════
-- CareLink PostgreSQL Schema (Amazon RDS)
-- ═══════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Users ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(50)  PRIMARY KEY,
  name          VARCHAR(150) NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone         VARCHAR(20),
  role          VARCHAR(20)  NOT NULL CHECK (role IN ('PATIENT','DOCTOR','ADMIN')),
  status        VARCHAR(20)  NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','suspended')),
  avatar_url    TEXT,
  cognito_sub   VARCHAR(255) UNIQUE,
  created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email  ON users(email);
CREATE INDEX idx_users_role   ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- ─── Patients ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS patients (
  id                VARCHAR(50)  PRIMARY KEY,
  user_id           VARCHAR(50)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth     DATE,
  blood_type        VARCHAR(5)   CHECK (blood_type IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  emergency_contact TEXT,
  allergies         TEXT,
  primary_doctor_id VARCHAR(50),
  created_at        TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_patients_user_id ON patients(user_id);

-- ─── Doctors ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS doctors (
  id              VARCHAR(50)  PRIMARY KEY,
  user_id         VARCHAR(50)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialty       VARCHAR(100) NOT NULL,
  license_number  VARCHAR(50)  UNIQUE,
  hospital        VARCHAR(200),
  bio             TEXT,
  available       BOOLEAN      NOT NULL DEFAULT TRUE,
  consultation_fee DECIMAL(10,2),
  created_at      TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_doctors_user_id   ON doctors(user_id);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);

-- ─── Appointments ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
  id           VARCHAR(50)  PRIMARY KEY,
  patient_id   VARCHAR(50)  NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id    VARCHAR(50)  NOT NULL REFERENCES doctors(id)  ON DELETE CASCADE,
  type         VARCHAR(100) NOT NULL DEFAULT 'Consultation',
  scheduled_at TIMESTAMP    NOT NULL,
  duration_min INTEGER      NOT NULL DEFAULT 30,
  status       VARCHAR(20)  NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending','confirmed','cancelled','completed','no-show')),
  notes        TEXT,
  teleconsult_url TEXT,
  created_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_appt_patient_id   ON appointments(patient_id);
CREATE INDEX idx_appt_doctor_id    ON appointments(doctor_id);
CREATE INDEX idx_appt_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_appt_status       ON appointments(status);

-- ─── Prescriptions ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prescriptions (
  id           VARCHAR(50)  PRIMARY KEY,
  patient_id   VARCHAR(50)  NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id    VARCHAR(50)  NOT NULL REFERENCES doctors(id)  ON DELETE CASCADE,
  medicine     VARCHAR(200) NOT NULL,
  dosage       VARCHAR(50)  NOT NULL,
  frequency    VARCHAR(100) NOT NULL,
  start_date   DATE         NOT NULL,
  end_date     DATE         NOT NULL,
  instructions TEXT,
  status       VARCHAR(20)  NOT NULL DEFAULT 'active'
               CHECK (status IN ('active','completed','discontinued')),
  created_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rx_patient_id ON prescriptions(patient_id);
CREATE INDEX idx_rx_doctor_id  ON prescriptions(doctor_id);
CREATE INDEX idx_rx_status     ON prescriptions(status);

-- ─── Medical Records ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS medical_records (
  id         VARCHAR(50)  PRIMARY KEY,
  patient_id VARCHAR(50)  NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id  VARCHAR(50)  REFERENCES doctors(id),
  type       VARCHAR(100) NOT NULL,
  title      VARCHAR(300) NOT NULL,
  s3_key     TEXT,
  notes      TEXT,
  created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_records_patient_id ON medical_records(patient_id);
CREATE INDEX idx_records_type       ON medical_records(type);

-- ─── updated_at trigger ────────────────────────────────────
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['users','patients','doctors','appointments','prescriptions']
  LOOP
    EXECUTE format('CREATE TRIGGER trg_%s_updated BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION update_timestamp()', tbl, tbl);
  END LOOP;
END $$;
