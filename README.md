# # 🚀 Engineering Resource Management System
A fullstack application to manage engineering teams, projects, assignments, and performance metrics. Built with **Next.js** for the frontend and **Node.js + Express + MongoDB** for the backend.



https://github.com/user-attachments/assets/0d90956d-66ac-45f2-a8f4-7aa67bd98d3a




📦 Tech Stack
Frontend
⚛️ Next.js (App Router / Pages Router)

💨 Tailwind CSS

🪄 Shadcn/UI or Lucide for components/icons

📦 Fetch API / Axios for API handling (with Base URL configuration)

🍪 LocalStorage / JWT-based Auth

Backend
🚀 Node.js & Express.js

🗃️ MongoDB with Mongoose

🔐 JWT Authentication with Role-Based Access

📋 RESTful API architecture

🛡️ Middleware for Authorization & Validation

📈 Mongoose Virtuals, Aggregates, and Stats

✨ Features
Key Features
🔐 Authentication & Authorization: Secure JWT-based authentication with role-based access control

👥 User Management: Full user lifecycle management with roles & permissions

📊 Project Management: Create, track, and manage engineering projects with team assignments

📋 Assignment Tracking: Task management with time tracking & progress monitoring

📈 Analytics Dashboard: Stats with charts and performance metrics

🤖 AI Integration: AI-powered project description generation and intelligent suggestions

🔒 Enhanced Security: Rate limiting, data sanitization, and CORS protection

📱 Responsive Design: Mobile-first design with Tailwind CSS

🤖 AI Integration
Project Description Generation: AI-powered automatic description generation

Development Assistance: ChatGPT and AI tools for optimization

Future Enhancements: Planned OpenAI integration

More AI Features Planned:

Voice Commands for Admins/Managers

Weekly AI-generated Project Summaries

Smart Notifications for overloaded engineers and delayed projects

📋 Prerequisites
Node.js (v18+)

MongoDB (v5.0+)

npm or yarn

Git

🔧 Installation & Setup
1. Clone the Repository
bash

# Frontend
git clone https://github.com/sahritika07/EngineerMgmt-Frontend

# Backend
git clone https://github.com/sahritika07/EngineerMgnt-System-Backend
2. Backend Setup
bash

cd EngineerMgnt-System-Backend
npm install
cp .env.example .env
.env Configuration:

env
Copy
Edit
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

MONGODB_URI=mongodb://localhost:27017/engineering-resource-management

JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_TIME=30

RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
Start MongoDB and Seed Database:

bash

mongod
npm run seed
npm run dev
3. Frontend Setup
bash

cd EngineerMgmt-Frontend
npm install
cp .env.example .env.local
.env.local Configuration:

env

NEXT_PUBLIC_API_URL=https://engineeringteam-mgmt-app-backend.onrender.com/api
Start Frontend:

bash

npm run dev
🔗 Access the Application
Frontend: http://localhost:3000

Backend API: https://engineeringteam-mgmt-app-backend.onrender.com/api

API Documentation: Available at same API base

🛡️ Authentication Roles
Admin: Full access (users, projects, assignments)

Manager: Can manage only their projects & team

Engineer: Can view only assigned projects/tasks

🔹 Base URL Management (New Updates)
All API calls now use API_BASE constant:


const API_BASE = "https://engineeringteam-mgmt-app-backend.onrender.com";
const res = await fetch(`${API_BASE}/api/engineers/overview`, { headers });
This ensures consistent production-ready URLs and easier environment switching.

🔑 Benefits of Using API_BASE
Centralized API URL management

No need to hardcode localhost or production URLs

Seamless switch between dev/staging/prod environments

Reduces API call errors




