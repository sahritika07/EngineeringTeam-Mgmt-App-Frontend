# # 🚀 Engineering Resource Management System
A fullstack application to manage engineering teams, projects, assignments, and performance metrics. Built with **Next.js** for the frontend and **Node.js + Express + MongoDB** for the backend.



https://github.com/user-attachments/assets/0d90956d-66ac-45f2-a8f4-7aa67bd98d3a





## 📦 Tech Stack

### Frontend
- ⚛️ Next.js (App Router / Pages Router)
- 💨 Tailwind CSS
- 🪄 Shadcn/UI or Lucide for components/icons
- 📦 Axios for API handling
- 🍪 LocalStorage / JWT-based Auth

### Backend
- 🚀 Node.js & Express.js
- 🗃️ MongoDB with Mongoose
- 🔐 JWT Authentication with Role-Based Access
- 📋 RESTful API architecture
- 🛡️ Middleware for Authorization & Validation
- 📈 Mongoose Virtuals, Aggregates, and Stats

---

## ✨ Features

### Key Features

- **🔐 Authentication & Authorization**: Secure JWT-based authentication with role-based access control
- **👥 User Management**: Complete user lifecycle management with different roles and permissions
- **📊 Project Management**: Create, track, and manage engineering projects with team assignments
- **📋 Assignment Tracking**: Detailed task management with time tracking and progress monitoring
- **📈 Analytics Dashboard**: Comprehensive analytics with charts and performance metrics
- **🤖 AI Integration**: AI-powered project description generation and intelligent suggestions
- **🔒 Enhanced Security**: Multiple security layers including rate limiting, data sanitization, and CORS protection
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS for optimal user experience



### AI Integration
- **Project Description Generation**: AI-powered automatic description generation based on project names
- **Development Assistance**: ChatGPT and AI tools used for code optimization and feature development
- **Future Enhancements**: Planned integration with OpenAI API for advanced features

More AI Integration Ideas for future enhancement:

- **Voice Commands for Admins/Managers**: “Assign this task to best available engineer”.
- **Weekly Project Summary via AI**: Auto-generated project summary sent every Friday.
- **Smart Notifications**: “This engineer is overloaded”, “This project is behind”.

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (v5.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🔧 Installation & Setup

###  Clone the Repository

\`\`\`bash
frontend - git clone https://github.com/sahritika07/EngineerMgmt-Frontend
backend - git clone https://github.com/sahritika07/EngineerMgnt-System-Backend
\`\`\`



# Install dependencies
npm install

# Create environment file
cp .env.example .env


**Configure your `.env` file:**

\`\`\`env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/engineering-resource-management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Security Configuration
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_TIME=30

# Rate Limiting Configuration
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100


**Start MongoDB and seed the database:**

\`\`\`bash
# Make sure MongoDB is running
mongod

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
\`\`\`

### 3. Frontend Setup

\`\`\`bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
\`\`\`

**Configure your `.env.local` file:**

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

**Start the frontend development server:**

\`\`\`bash
npm run dev
\`\`\`

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Documentation**: http://localhost:5000/api

🛡️ Authentication Roles

Admin: Full access to users, projects, assignments
Manager: Can manage projects they created
Engineer: Can view assigned projects/tasks only



### Key Benefits of Axios Integration:

1. **Automatic Request/Response Transformation**: JSON parsing and stringifying
2. **Interceptors**: Automatic token attachment and error handling
3. **Request/Response Timeout**: Prevents hanging requests
4. **Error Handling**: Centralized error management
5. **Base URL Configuration**: Environment-based API endpoint management


