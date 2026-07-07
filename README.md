# AI Interview Preparation Platform

AI Interview Preparation Platform is a full-stack AI-powered interview preparation platform that helps candidates prepare for technical interviews by analyzing their resume and comparing it with a target job description.

The platform generates personalized interview questions, identifies skill gaps, creates a preparation roadmap, and builds an ATS-friendly resume using Google's Gemini AI.

---
## Live Demo

Frontend (Netlify): https://ai-powered-interview-preparation.netlify.app/

Backend (Render + Docker): https://ai-powered-interview-preparation-platform-ej3q.onrender.com/

Dockerized Backend:
The backend is containerized using Docker, ensuring a consistent development and production environment. The Docker image packages the Node.js application and its dependencies, making deployment portable, reproducible, and platform-independent.

---

## Features

- Secure JWT Authentication
- Resume Upload (PDF)
- Resume Parsing
- AI-Powered Resume Analysis
- Job Description Matching
- Match Score Generation
- Technical Interview Questions
- Behavioral Interview Questions
- Skill Gap Analysis
- Personalized Preparation Roadmap
- ATS-Friendly Resume Generation
- Interview History Dashboard
- Protected Routes
- Responsive Modern UI

---

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- SCSS
- Context API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### AI

- Google Gemini 2.5 Flash

---

## Project Structure

```
AI-ReS
│
├── Frontend
│   ├── src
│   ├── public
│   └── dist
│
└── Backend
    ├── src
    │   ├── controllers
    │   ├── middleware
    │   ├── models
    │   ├── routes
    │   ├── services
    │   └── config
    │
    ├── server.js
    └── app.js
```

---

## Backend Dependencies

### @google/genai

Used to communicate with Google's Gemini API.

Responsibilities:

- Resume Analysis
- Job Description Matching
- Interview Question Generation
- ATS Resume HTML Generation

---

### bcryptjs

Used for password hashing before storing user credentials in MongoDB.

---

### cookie-parser

Parses authentication cookies sent by the browser.

Used for JWT authentication.

---

### cors

Allows secure communication between the React frontend and Express backend.

Configured with credentials support.

---

### dotenv

Loads environment variables from the `.env` file.

Used for:

- MongoDB URI
- JWT Secret
- Gemini API Key

---

### express

Main backend framework responsible for:

- Routing
- Middleware
- API Endpoints
- Request Handling

---

### jsonwebtoken

Implements JWT-based authentication.

Used for:

- Token Generation
- Protected Routes
- User Authentication

---

### mongoose

ODM used to communicate with MongoDB.

Responsible for:

- Database Models
- Validation
- CRUD Operations

---

### multer

Handles multipart/form-data requests.

Used to upload user resumes before parsing.

---

### nodemon

Development dependency.

Automatically restarts the backend server whenever files change.

---

### pdf-parse

Extracts text from uploaded PDF resumes.

The extracted text is later sent to Gemini AI for analysis.

---

### puppeteer

Generates professional ATS-compatible PDF resumes from HTML templates created by Gemini.

---

### zod

Defines schemas for AI responses.

Ensures Gemini always returns structured and validated JSON.

---

### zod-to-json-schema

Converts Zod schemas into JSON Schema so Gemini understands the expected response format.

---

## Authentication Flow

```
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
HTTP Cookie
    │
    ▼
Protected Routes
```

---

## Interview Generation Flow

```
Upload Resume
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

## ATS Resume Generation Flow

```
Resume Data
       │
       ▼
Gemini AI
       │
       ▼
HTML Resume
       │
       ▼
Puppeteer
       │
       ▼
PDF Resume
```

---

## Environment Variables

Create a `.env` file inside the Backend folder.

```
PORT=3000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret

GOOGLE_GENAI_API_KEY=your_api_key
```

---

## Installation

Clone the repository

```
git clone https://github.com/Priyanshu57005/AI-Powered-Interview-Preparation-Platform
```

Backend

```
cd Backend
npm install
npm run dev
```

Frontend

```
cd Frontend
npm install
npm run dev
```

---

## Author

**Priyanshu Gautam**

B.Tech Information Technology
SDE Fresher 

GitHub: https://github.com/Priyanshu57005
LinkedIn: https://linkedin.com/in/priyanshu-gautam-12b5a0298

---
