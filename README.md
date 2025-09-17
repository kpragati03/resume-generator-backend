# 🛠️ Resume Generator - Backend API

A robust Node.js backend API for the Resume Generator application, providing user authentication, resume management, and data persistence. Built with Express.js, MongoDB, and deployed on Railway.

## ⚡ Features

### 🔐 **Authentication System**
- **JWT-based Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for secure password storage
- **User Registration & Login** - Complete auth flow
- **Protected Routes** - Middleware-based route protection

### 📄 **Resume Management**
- **CRUD Operations** - Create, Read, Update, Delete resumes
- **User-specific Data** - Each user manages their own resumes
- **Template Support** - Store template preferences and colors
- **Resume Sharing** - Public sharing via unique IDs

### 🗄️ **Data Persistence**
- **MongoDB Integration** - Scalable NoSQL database
- **Mongoose ODM** - Elegant MongoDB object modeling
- **Data Validation** - Schema-based validation
- **Error Handling** - Comprehensive error management

### 🌐 **API Features**
- **RESTful Architecture** - Clean, intuitive API design
- **CORS Support** - Cross-origin resource sharing
- **Request Validation** - Input validation and sanitization
- **Rate Limiting** - API abuse protection

## 🚀 Live API

**Backend API:** [https://resume-generator-website.up.railway.app](https://resume-generator-website.up.railway.app)

**Frontend Application:** [https://resume-generator-frontend-two.vercel.app](https://resume-generator-frontend-two.vercel.app)

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JSON Web Tokens (JWT) |
| **Password Hashing** | bcryptjs |
| **Validation** | express-validator |
| **Environment** | dotenv |
| **CORS** | cors |
| **Deployment** | Railway |

## 📁 Project Structure

```
backend/
├── controllers/
│   └── authController.js          # Authentication logic
├── middleware/
│   └── authMiddleware.js          # JWT verification middleware
├── models/
│   ├── Resume.js                  # Resume data model
│   └── User.js                    # User data model
├── routes/
│   ├── auth.js                    # Authentication routes
│   ├── resume.js                  # Resume management routes
│   ├── share.js                   # Resume sharing routes
│   └── user.js                    # User management routes
├── .env                           # Environment variables
├── package.json                   # Dependencies and scripts
└── server.js                      # Main server file
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/kpragati03/resume-generator-backend.git
cd resume-generator-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-generator

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Origins
FRONTEND_URL=https://resume-generator-frontend-two.vercel.app
```

### 4. Start the Server
```bash
# Development
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000`

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the production server |
| `npm run dev` | Start development server with nodemon |
| `npm test` | Run test suite (if configured) |

## 🗄️ Database Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Resume Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  resumeData: {
    name: String,
    email: String,
    phone: String,
    address: String,
    profession: String,
    education: [{
      degree: String,
      institution: String,
      year: String
    }],
    experience: [{
      company: String,
      role: String,
      duration: String,
      description: String
    }],
    skills: [String]
  },
  selectedTemplate: String,
  color: String,
  shareId: String (unique, for public sharing),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication Endpoints

#### **POST** `/api/auth/register`
Register a new user
```json
Request Body:
{
  "name": "Pragati Kumari",
  "email": "kumaripragatiii03@gmail.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "Pragati Kumari",
    "email": "kumaripragatiii03@gmail.com"
  }
}
```

#### **POST** `/api/auth/login`
Authenticate user
```json
Request Body:
{
  "email": "kumaripragatiii03@gmail.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "Pragati Kumari",
    "email": "kumaripragatiii03@gmail.com"
  }
}
```

#### **GET** `/api/auth/me`
Get current user info
```json
Headers:
{
  "x-auth-token": "your-jwt-token"
}

Response:
{
  "id": "user_id",
  "name": "Pragati Kumari",
  "email": "kumaripragatiii03@gmail.com"
}
```

### Resume Management Endpoints

#### **POST** `/api/resume`
Save a new resume
```json
Headers:
{
  "x-auth-token": "your-jwt-token",
  "Content-Type": "application/json"
}

Request Body:
{
  "resumeData": {
    "name": "Pragati Kumari",
    "email": "kumaripragatiii03@gmail.com",
    "phone": "+1234567890",
    "address": "Your Address",
    "profession": "Software Developer",
    "education": [...],
    "experience": [...],
    "skills": ["JavaScript", "React", "Node.js"]
  },
  "selectedTemplate": "modern",
  "color": "#3b82f6"
}
```

#### **GET** `/api/resume/user`
Get all user's resumes
```json
Headers:
{
  "x-auth-token": "your-jwt-token"
}

Response:
{
  "success": true,
  "resumes": [...]
}
```

#### **GET** `/api/resume/:id`
Get specific resume
```json
Response:
{
  "success": true,
  "resume": {...}
}
```

#### **PUT** `/api/resume/:id`
Update existing resume
```json
Headers:
{
  "x-auth-token": "your-jwt-token"
}
```

#### **DELETE** `/api/resume/:id`
Delete resume
```json
Headers:
{
  "x-auth-token": "your-jwt-token"
}
```

### Resume Sharing Endpoints

#### **GET** `/api/share/resume/:shareId`
Get publicly shared resume
```json
Response:
{
  "success": true,
  "resume": {
    "resumeData": {...},
    "selectedTemplate": "modern",
    "color": "#3b82f6"
  }
}
```

#### **POST** `/api/share/resume/:id`
Generate share link for resume
```json
Headers:
{
  "x-auth-token": "your-jwt-token"
}

Response:
{
  "success": true,
  "shareUrl": "https://resume-generator-frontend-two.vercel.app/share/resume/unique-share-id"
}
```

## 🔐 Authentication Middleware

```javascript
// authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
```

## 🛡️ Security Features

### Password Security
- **bcryptjs hashing** with salt rounds
- **Password strength validation**
- **No plain text storage**

### JWT Implementation
- **Secure token generation**
- **Expiration handling**
- **Token verification middleware**

### Input Validation
- **express-validator** for request validation
- **MongoDB injection prevention**
- **XSS protection**

### CORS Configuration
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

## 🚀 Deployment (Railway)

### Environment Variables on Railway
```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
NODE_ENV=production
FRONTEND_URL=https://resume-generator-frontend-two.vercel.app
PORT=5000
```

### Deployment Steps
1. **Connect GitHub Repository** to Railway
2. **Set Environment Variables** in Railway dashboard
3. **Configure Build Settings**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Deploy** automatically on push to main branch

### Health Check Endpoint
```javascript
// GET /api/health
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});
```

## 📊 Error Handling

### Centralized Error Handler
```javascript
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};
```

## 🔧 Server Configuration

### Main Server Setup
```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resume', require('./routes/resume'));
app.use('/api/share', require('./routes/share'));
app.use('/api/user', require('./routes/user'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Failed
```bash
# Check MongoDB URI format
mongodb+srv://username:password@cluster.mongodb.net/database-name

# Verify network access in MongoDB Atlas
# Check environment variables
```

#### JWT Token Issues
```javascript
// Verify JWT_SECRET is set
console.log('JWT Secret:', process.env.JWT_SECRET ? 'Set' : 'Not Set');

// Check token format in frontend
headers: {
  'x-auth-token': token,
  'Content-Type': 'application/json'
}
```

#### CORS Errors
```javascript
// Update CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://resume-generator-frontend-two.vercel.app'
  ],
  credentials: true
};
```

## 📈 Performance Optimization

### Database Indexing
```javascript
// User model indexes
userSchema.index({ email: 1 });

// Resume model indexes
resumeSchema.index({ userId: 1, createdAt: -1 });
resumeSchema.index({ shareId: 1 });
```

### Caching Strategy
- **Memory caching** for frequently accessed data
- **Database connection pooling**
- **Optimized queries** with select fields

## 🔮 Future Enhancements

- [ ] **Rate Limiting** - API abuse protection
- [ ] **File Upload** - Profile pictures, resume attachments
- [ ] **Email Service** - Welcome emails, sharing notifications
- [ ] **Analytics** - Usage tracking and metrics
- [ ] **WebSocket** - Real-time collaboration
- [ ] **Microservices** - Service decomposition
- [ ] **Docker** - Containerization
- [ ] **Testing** - Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Developer

**Pragati Kumari**
- GitHub: [@kpragati03](https://github.com/kpragati03)
- Email: kumaripragatiii03@gmail.com
- LinkedIn: [kpragati03](https://www.linkedin.com/in/kpragati03/)

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) for the robust web framework
- [MongoDB](https://www.mongodb.com/) for the flexible database solution
- [Mongoose](https://mongoosejs.com/) for elegant MongoDB modeling
- [Railway](https://railway.app/) for seamless deployment
- [JSON Web Tokens](https://jwt.io/) for secure authentication

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

[![Backend Stars](https://img.shields.io/github/stars/kpragati03/resume-generator-backend.svg?style=social&label=Star&maxAge=2592000)](https://github.com/kpragati03/resume-generator-backend/stargazers)
[![Frontend Stars](https://img.shields.io/github/stars/kpragati03/resume-generator-frontend.svg?style=social&label=Frontend%20Stars&maxAge=2592000)](https://github.com/kpragati03/resume-generator-frontend/stargazers)

Made with ❤️ and Node.js by **Pragati Kumari**

[🌐 API Documentation](https://resume-generator-website.up.railway.app) | [⚡ Frontend App](https://resume-generator-frontend-two.vercel.app)

</div>
