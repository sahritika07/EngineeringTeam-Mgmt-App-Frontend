# # 🚀 Engineering Resource Management System
A fullstack application to manage engineering teams, projects, assignments, and performance metrics. Built with **Next.js** for the frontend and **Node.js + Express + MongoDB** for the backend.


Live Url - https://engineering-team-mgmt-app-frontend.vercel.app/



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


🛠️ Use of AI Tools
1. ChatGPT
- **I used ChatGPT extensively during the development of this Engineering Management System for:

- **Debugging & Fixing Bugs:

- **Asked for solutions when encountering logic errors in backend APIs and frontend state management.

- **Used suggestions to fix database schema inconsistencies and optimize API calls.

- **Code Optimization & Best Practices:

- **Requested guidance on improving Node.js controllers and middleware structure.

- **Improved React component structure and state handling.

- **Feature Logic Planning:

- **Discussed approaches for calculating project progress and dynamic dashboard updates.

- **Received ideas on modularizing the frontend and backend for scalability.

2. GitHub Copilot
- **I used GitHub Copilot directly in my code editor (both frontend and backend) for:

- **Code Auto-completion:

- **Generated boilerplate code for Express routes, controllers, and React components.

- **Helped with TailwindCSS class suggestions for faster UI styling.

- **Error Handling Snippets:

- **Suggested try-catch patterns and validation middleware for APIs.

- **Frontend State & Hooks:

- **Helped quickly scaffold React hooks (useEffect, useState) and context logic.

3.How it helped the Project
- **Increased development speed by suggesting relevant code snippets.

- **Reduced debugging time by pointing out possible logic or syntax issues.

- **Helped maintain clean and modular code on both frontend (React + Tailwind) and backend (Node.js + Express + MongoDB).


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



📋 Prerequisites
Node.js (v18+)

MongoDB (v5.0+)

npm or yarn

Git

🔧 Installation & Setup
1. Clone the Repository
bash

# Frontend
git clone https://github.com/sahritika07/EngineeringTeam-Mgmt-App-Frontend

# Backend
git clone https://github.com/sahritika07/EngineeringTeam-Mgmt-App-Backend
2. Backend Setup
bash

- **cd EngineerMgnt-System-Backend
- **npm install
- **cp .env.example .env
- **.env Configuration:

env

- **NODE_ENV=development
- **PORT=5000
- **FRONTEND_URL=http://localhost:3000

- **MONGODB_URI=mongodb://localhost:27017/engineering-resource-management

- **JWT_SECRET=your-super-secret-jwt-key-here
- **JWT_EXPIRE=30d

- **BCRYPT_ROUNDS=12
- **MAX_LOGIN_ATTEMPTS=5
- **LOCKOUT_TIME=30

- **RATE_LIMIT_WINDOW=15
- **RATE_LIMIT_MAX_REQUESTS=100
- **Start MongoDB and Seed Database:

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


🛡️ Authentication Roles

Manager: Can manage only their projects & team

Engineer: Can view only assigned projects/tasks


Seamless switch between dev/staging/prod environments

Reduces API call errors




