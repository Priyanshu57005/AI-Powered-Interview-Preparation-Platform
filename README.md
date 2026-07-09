# AI Interview Preparation Platform

AI Interview Preparation Platform is a full-stack AI-powered interview preparation platform that helps candidates prepare for technical interviews by analyzing resumes against target job descriptions.

The platform leverages Google's Gemini AI to generate personalized interview questions, ATS match scores, skill gap analysis, personalized preparation roadmaps, and ATS-friendly resumes.

---

# Live Demo

### Frontend (Netlify)

https://ai-powered-interview-preparation.netlify.app/

### Backend API (Render + Docker)

https://ai-powered-interview-preparation-platform-ej3q.onrender.com/

### Docker Hub

https://hub.docker.com/r/priyanshudv/ai-interview-prep-backend

---

# Deployment Architecture

```text
                    User
                      │
                      ▼
        React Frontend (Netlify)
                      │
             HTTPS REST API
                      │
                      ▼
     Docker Container (Render)
                      │
           Node.js + Express API
                      │
                      ▼
             MongoDB Atlas
                      │
                      ▼
            Google Gemini AI
```

---

# Docker

The backend is fully containerized using Docker to ensure a consistent development and production environment.

### Pull Image

```bash
docker pull priyanshudv/ai-interview-prep-backend:latest
```

### Run Container

```bash
docker run -p 3000:3000 --env-file .env priyanshudv/ai-interview-prep-backend:latest
```

### Benefits

- Consistent runtime across environments
- Portable and reproducible deployments
- Eliminates environment-specific issues
- Simplifies cloud deployment
- Production-ready backend containerization

---

# Features

- Secure JWT Authentication
- Resume Upload (PDF)
- Resume Parsing
- AI Resume Analysis
- Job Description Matching
- ATS Match Score Generation
- Technical Interview Questions
- Behavioral Interview Questions
- Skill Gap Analysis
- Personalized Preparation Roadmap
- ATS-Friendly Resume Generation
- Interview History Dashboard
- Protected Routes
- Responsive Modern UI

---

# Tech Stack

## Frontend

- React.js
- React Router
- Axios
- Context API
- SCSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST APIs

## AI

- Google Gemini 2.5 Flash
- Zod
- JSON Schema

## Deployment

- Docker
- Render
- Netlify
- MongoDB Atlas

---

# System Design Highlights

- Layered Backend Architecture (Routes → Controllers → Services → Database)
- Stateless JWT Authentication using HTTP-only Cookies
- RESTful API Design
- AI Processing Pipeline
- PDF Resume Parsing Pipeline
- Structured AI Response Validation using Zod
- ATS Resume Generation using Puppeteer
- Dockerized Backend Deployment
- Cloud Database using MongoDB Atlas

---

# Project Structure

```text
AI-ReS
│
├── Frontend
│   ├── src
│   ├── public
│   ├── dist
│   └── package.json
│
└── Backend
    ├── src
    │   ├── config
    │   ├── controllers
    │   ├── middleware
    │   ├── models
    │   ├── routes
    │   ├── services
    │   └── utils
    │
    ├── uploads
    ├── server.js
    ├── package.json
    └── Dockerfile
```

---

# Authentication Flow

```text
User
 │
 ▼
Register
 │
 ▼
Password Hashing (bcrypt)
 │
 ▼
MongoDB
 │
 ▼
Login
 │
 ▼
JWT Token
 │
 ▼
HTTP-only Cookie
 │
 ▼
Authentication Middleware
 │
 ▼
Protected Routes
```

---

# Interview Generation Flow

```text
Resume Upload
      │
      ▼
PDF Parsing
      │
      ▼
Resume Text
      │
      ▼
Job Description
      │
      ▼
Google Gemini AI
      │
      ▼
Structured Interview Report
      │
      ▼
MongoDB
      │
      ▼
Interview Dashboard
```

---

# ATS Resume Generation Flow

```text
Resume Data
      │
      ▼
Google Gemini AI
      │
      ▼
HTML Resume
      │
      ▼
Puppeteer
      │
      ▼
ATS-Friendly PDF Resume
```

---

# Backend Dependencies

| Package | Purpose |
|----------|---------|
| Express | REST API & Routing |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| cookie-parser | Cookie Parsing |
| cors | Cross-Origin Requests |
| multer | Resume Upload |
| pdf-parse | PDF Text Extraction |
| @google/genai | Gemini AI Integration |
| zod | AI Response Validation |
| zod-to-json-schema | JSON Schema Generation |
| puppeteer | ATS PDF Resume Generation |
| dotenv | Environment Variables |

---

# Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret

GOOGLE_GENAI_API_KEY=your_api_key
```

---

# Installation

### Clone Repository

```bash
git clone https://github.com/Priyanshu57005/AI-Powered-Interview-Preparation-Platform.git
```

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

# Future Improvements

- OAuth Authentication
- Mock Interview Video Calls
- AI Voice Interview
- Real-time Interview Analytics
- Company-wise Interview Question Bank
- Interview Performance Dashboard
- Email Notifications
- Interview Sharing
- Docker Compose Support
- CI/CD Pipeline using GitHub Actions

---

# Author

**Priyanshu Gautam**

B.Tech Information Technology

Aspiring Software Development Engineer (SDE)

**GitHub**
https://github.com/Priyanshu57005

**LinkedIn**
https://www.linkedin.com/in/priyanshu-gautam-12b5a0298

---

⭐ If you found this project useful, consider giving it a star on GitHub.
