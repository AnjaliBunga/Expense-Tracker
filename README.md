# 💰 Expense Tracker

<div align="center">

![Expense Tracker](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)

**A modern, full-stack expense tracking application with real-time data synchronization, secure authentication, and beautiful responsive design.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-00C851?style=for-the-badge&logo=vercel&logoColor=white)](https://expense-tracker-frontend.onrender.com)
[![API Docs](https://img.shields.io/badge/API%20Docs-View%20Endpoints-FF6B6B?style=for-the-badge&logo=swagger&logoColor=white)](https://expense-tracker-u4r9.onrender.com/api/health)

</div>

## 🌐 Live Application

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [expense-tracker-frontend.onrender.com](https://expense-tracker-frontend.onrender.com) | 🟢 Live |
| **Backend API** | [expense-tracker-u4r9.onrender.com](https://expense-tracker-u4r9.onrender.com) | 🟢 Live |

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🔐 **Authentication**
- Secure JWT-based authentication
- Password hashing with bcrypt
- Persistent user sessions
- Protected API routes

### 💸 **Expense Management**
- Add, edit, and delete expenses
- Category-based organization
- Date filtering and sorting
- Real-time data synchronization

</td>
<td width="50%">

### 📊 **Data Visualization**
- Interactive charts and graphs
- Category spending breakdown
- Monthly trend analysis
- Comprehensive statistics

### 🎨 **Modern UI/UX**
- Fully responsive design
- Clean, intuitive interface
- Smooth animations
- Mobile-optimized

</td>
</tr>
</table>

## 🚀 Getting Started

### 🌐 Live Demo
**Try the application right now!** No setup required.

[![Try Live Demo](https://img.shields.io/badge/🚀%20Try%20Live%20Demo-Visit%20Now-00C851?style=for-the-badge&logo=rocket&logoColor=white)](https://expense-tracker-frontend.onrender.com)

### 🛠️ Local Development

<details>
<summary><b>📋 Prerequisites</b></summary>

- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn package manager

</details>

<details>
<summary><b>⚡ Quick Setup</b></summary>

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

# 2. Install dependencies
cd backend && npm install
cd ../src && npm install

# 3. Environment setup
cd ../backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 4. Start the application
npm start  # Backend (port 5000)
npm start  # Frontend (port 3000)
```

</details>

<details>
<summary><b>🔧 Environment Variables</b></summary>

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

</details>

## 🏗️ Architecture

```
📁 expense-tracker/
├── 🖥️  backend/                 # Node.js + Express API
│   ├── 📁 controllers/          # Business logic
│   ├── 📁 middleware/           # Authentication & validation
│   ├── 📁 model/               # MongoDB schemas
│   ├── 📁 Routes/              # API endpoints
│   ├── 📁 db/                  # Database connection
│   └── 📄 index.js             # Server entry point
├── 🎨 src/                     # React frontend
│   ├── 📁 components/          # UI components
│   ├── 📁 services/            # API integration
│   └── 📄 App.jsx              # Main application
└── 📄 README.md                # Documentation
```

### 🔧 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18.2.0 | User interface |
| **Backend** | Node.js + Express | API server |
| **Database** | MongoDB Atlas | Data storage |
| **Authentication** | JWT + bcrypt | Security |
| **Charts** | Chart.js | Data visualization |
| **Deployment** | Render | Cloud hosting |

## 📱 Responsive Design

The application is fully responsive with optimized layouts for all devices:

| Device | Breakpoint | Layout |
|--------|------------|--------|
| **Desktop** | 1200px+ | Two-column layout with side-by-side panels |
| **Tablet** | 768px-1199px | Single column with stacked components |
| **Mobile** | 480px-767px | Mobile-optimized with touch interactions |
| **Small Mobile** | <480px | Compact layout with minimal spacing |

## 🔧 API Documentation

**Base URL**: `https://expense-tracker-u4r9.onrender.com`

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/users/signup` | User registration | ❌ |
| `POST` | `/api/users/login` | User login | ❌ |

### 💰 Expense Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/expenses` | Get all user expenses | ✅ |
| `POST` | `/api/expenses` | Create new expense | ✅ |
| `GET` | `/api/expenses/:id` | Get specific expense | ✅ |
| `PUT` | `/api/expenses/:id` | Update expense | ✅ |
| `DELETE` | `/api/expenses/:id` | Delete expense | ✅ |
| `GET` | `/api/expenses/stats/summary` | Get expense statistics | ✅ |

### 🏥 System Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/health` | Server health check | ❌ |

## 🔒 Security Features

- **🔐 JWT Authentication** - Secure token-based authentication
- **🛡️ Password Hashing** - bcrypt encryption for password security
- **🔒 Protected Routes** - Middleware for route protection
- **✅ Input Validation** - Server-side validation and sanitization
- **🌐 CORS Configuration** - Cross-origin security
- **🔑 Environment Variables** - Sensitive data protection

## 🎨 Design System

### 🎨 Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#667eea` → `#764ba2` | Gradients, buttons |
| **Background** | `#f5f7fa` → `#c3cfe2` | Page backgrounds |
| **Text** | `#2d3748` | Primary text |
| **Accent** | `#718096` | Secondary text |

### 📝 Typography
- **Font Family**: Inter, system fonts
- **Headings**: 600-700 font weight
- **Body**: 400-500 font weight
- **Responsive**: Fluid typography with rem units

### 🧩 Components
- **Cards**: White background with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Charts**: Custom styled with dark text for visibility

## 🚀 Deployment

### 🌐 Live Deployment
This application is deployed on **Render** with the following services:

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [expense-tracker-frontend.onrender.com](https://expense-tracker-frontend.onrender.com) | 🟢 Live |
| **Backend** | [expense-tracker-u4r9.onrender.com](https://expense-tracker-u4r9.onrender.com) | 🟢 Live |

### 🛠️ Deployment Guide

<details>
<summary><b>📦 Frontend Deployment (Render)</b></summary>

```bash
# 1. Build the application
npm run build

# 2. Deploy to Render
# - Connect GitHub repository
# - Set build command: npm run build
# - Set publish directory: build
# - Deploy automatically on push
```

</details>

<details>
<summary><b>🖥️ Backend Deployment (Render)</b></summary>

```bash
# 1. Add start script to package.json
"scripts": {
  "start": "node index.js"
}

# 2. Deploy to Render
# - Connect GitHub repository
# - Set build command: npm install
# - Set start command: npm start
# - Add environment variables (see below)
```

</details>

### 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT token signing | ✅ |
| `NODE_ENV` | Environment (production/development) | ✅ |



## 🌟 Project Highlights

This Expense Tracker demonstrates modern full-stack development with:

### 🏆 Key Achievements
- ✅ **Full-Stack Integration** - Seamless frontend-backend communication
- ✅ **Secure Authentication** - JWT-based auth with password hashing
- ✅ **Real-time Data Sync** - Instant UI updates with database integration
- ✅ **Responsive Design** - Mobile-first approach with modern UI/UX
- ✅ **Production Deployment** - Live application with cloud database
- ✅ **Professional Logging** - Comprehensive API monitoring and debugging

### 🛠️ Technical Excellence
- **Production-Ready Architecture** - Scalable backend with proper error handling
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Data Visualization** - Interactive charts and comprehensive statistics
- **Security First** - Protected routes, input validation, and secure authentication
- **Cloud Native** - Deployed on Render with MongoDB Atlas integration




---

## 🙏 Acknowledgments

| Technology | Purpose | Link |
|------------|---------|------|
| **React** | Frontend framework | [reactjs.org](https://reactjs.org) |
| **Express.js** | Backend framework | [expressjs.com](https://expressjs.com) |
| **MongoDB** | Database | [mongodb.com](https://mongodb.com) |
| **Chart.js** | Data visualization | [chartjs.org](https://chartjs.org) |
| **Render** | Cloud hosting | [render.com](https://render.com) |

---

## 📞 Contact & Support

| Resource | Link |
|----------|------|
| **Live Application** | [expense-tracker-frontend.onrender.com](https://expense-tracker-frontend.onrender.com) |
| **GitHub Repository** | [View Source Code]([https://github.com/yourusername/expense-tracker](https://github.com/AnjaliBunga/Expense-Tracker/)) |

---

<div align="center">

⭐ **Star this repository if you found it helpful!**

**Made with ❤️ by [Your Name](https://github.com/yourusername)**


</div>
