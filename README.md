# 🏥 CareLink — Remote Patient Monitoring Platform

> A full-stack cloud-native healthcare platform built on **AWS** services, featuring real-time patient monitoring, teleconsultation, and intelligent alerting.

---

## 🏗️ Architecture Overview

```
┌──────────────┐    ┌─────────────┐    ┌──────────────────────┐
│  React/Vite  │───▶│  Express API│───▶│  Amazon RDS          │
│  (Frontend)  │    │  (Backend)  │    │  PostgreSQL           │
└──────────────┘    └─────────────┘    └──────────────────────┘
                           │
                    ┌──────┴──────┐
                    ▼             ▼
             ┌──────────┐  ┌──────────┐
             │ DynamoDB │  │    S3    │
             │ (Vitals) │  │  (Files) │
             └──────────┘  └──────────┘
                    │
               ┌────▼────┐
               │ Kinesis │ ← IoT / Device vitals
               └────┬────┘
                    │
               ┌────▼────┐
               │ Lambda  │  (Vitals Ingestion + Alerting + Reports)
               └────┬────┘
                    │
               ┌────▼────┐
               │   SNS   │ → Email / Push / SMS notifications
               └─────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL 15+ (local) or AWS RDS

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at: http://localhost:5173

### Backend
```bash
cd backend
npm install
cp .env .env.local   # Edit with your values
node server.js
```
Runs at: http://localhost:5000

### Docker (Full Stack)
```bash
docker-compose up --build
```
- Frontend: http://localhost
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health

## 🔐 Demo Credentials

| Role    | Email              | Password |
|---------|--------------------|----------|
| Patient | patient@care.com   | demo123  |
| Doctor  | doctor@care.com    | demo123  |
| Admin   | admin@care.com     | demo123  |

## 📁 Project Structure

```
CareLink/
├── frontend/          # React + Vite SPA
│   └── src/
│       ├── components/    # 8 reusable components
│       ├── pages/         # 17 route-specific pages
│       ├── services/      # 7 API service files
│       └── context/       # AuthContext
├── backend/           # Express.js REST API
│   ├── controllers/   # Route handlers
│   ├── routes/        # Express routers
│   ├── middleware/    # Auth + RBAC
│   ├── services/      # AWS service wrappers
│   └── config/        # DB + AWS + env config
├── lambda/            # AWS Lambda functions
│   ├── vitalsIngestion/   # Kinesis → DynamoDB + SNS
│   ├── alerting/          # SNS → notification dispatch
│   └── reportGeneration/  # Scheduled → S3 reports
├── database/          # PostgreSQL
│   ├── schema.sql     # Tables, indexes, triggers
│   └── seed.sql       # Demo data
└── docker/            # Dockerfiles
```

## ☁️ AWS Services

| Service           | Purpose                                    |
|-------------------|--------------------------------------------|
| Amazon ECS Fargate| Container hosting for frontend + backend    |
| Amazon RDS PG     | Relational data (users, appointments, Rx)  |
| Amazon DynamoDB   | High-throughput vital signs storage        |
| Amazon S3         | EHR documents, lab reports, X-rays         |
| Amazon Kinesis    | Real-time vital data streaming             |
| AWS Lambda        | Serverless: ingestion, alerting, reports   |
| Amazon SNS        | Push/email/SMS health alert notifications  |
| Amazon Cognito    | User authentication & JWT tokens           |
| Amazon Chime SDK  | HD video teleconsultation                  |
| AWS ALB           | Load balancing across ECS tasks            |

## 📡 API Endpoints

```
GET    /health
POST   /api/auth/login
POST   /api/auth/register
GET    /api/patients
GET    /api/patients/:id
GET    /api/doctors
GET    /api/doctors/:id/patients
GET    /api/appointments
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
GET    /api/vitals/:patientId
POST   /api/vitals
GET    /api/prescriptions/:patientId
POST   /api/prescriptions
GET    /api/records/:patientId
POST   /api/records
POST   /api/records/upload-url
GET    /api/records/download-url
```

## 🗄️ Database Schema

- **users** — All platform accounts (Patient/Doctor/Admin)
- **patients** — Patient profiles with medical details
- **doctors** — Doctor profiles with specialty
- **appointments** — Consultation scheduling
- **prescriptions** — Digital medication prescriptions
- **medical_records** — Links to S3-stored documents

---

*Built for CareLink CIA-3 — Cloud Computing Architecture Assignment*
