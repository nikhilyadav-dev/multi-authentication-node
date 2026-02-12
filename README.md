
<div align="center">

# 🔐 MERN Auth Pro — Complete Authentication System 

A production-ready authentication system built using the MERN Stack, featuring secure JWT-based login, OTP verification via email and phone, password reset workflows, and structured backend architecture.
<br/>
<br/>

  
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
  [![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![JWT](https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge&logo=json-web-tokens)](https://jwt.io/)


[ 🚀 Key Features](#-Key-Features-Implemented) • [📸 Screenshots ](#-Screenshots ) • [💻 Tech Stack](#-tech-stack) • [📦 Installation Guide](#-Installation-Guide) 

</div>


---

## 🎯 Project Overview

- MERN Auth Pro is a comprehensive authentication project designed to demonstrate real-world user management and security practices.
- This system is built from scratch using React, Node.js, Express, and MongoDB, and covers the entire authentication lifecycle. It includes advanced features such as:
   - JWT-based authentication
   - Email OTP verification
   - Phone OTP verification
   - Forgot & Reset Password
---


## 🚀 Key Features Implemented

- **🔐 JWT-based Authentication**  
  Login, logout, registration, profile managementSecure token-based authentication system for protected API access.
  
- **📝 User Registration & Login**  
  Complete signup and login flow with credential validation.

- **📲 OTP Verification System**  
   Account verification via:
   - Email (NodeMailer)
   - Phone Call (Twilio)

- **🔁 Forgot & Reset Password**  
  Secure password recovery using OTP/token validation.

- **🛡️ Protected Routes & Middleware**  
  Authentication middleware to restrict unauthorized access.

- **🔒 Password Security**  
  bcrypt-based password hashing before storing in database.

- **⚡ Automation Features**  
  Automatic OTP generation, token creation, and verification handling.

- **🌐 RESTful Backend Architecture**  
  Structured API design with centralized error handling.

  ---

  
## 📸 Screenshots 

| Screenshot 1 | Screenshot 2 |
|--------------|--------------|
| ![Screenshot 1](https://github.com/nikhilyadav-dev/multi-authentication-node/blob/main/1-JWT/client/src/screenshots/1-Login.jpg?raw=true) | ![Screenshot 2](https://github.com/nikhilyadav-dev/multi-authentication-node/blob/main/1-JWT/client/src/screenshots/2-Signup.jpg?raw=true) |
| *Login* | *Register* |

| Screenshot 3 | Screenshot 4 |
|--------------|--------------|
| ![Screenshot 1](https://github.com/nikhilyadav-dev/multi-authentication-node/blob/main/1-JWT/client/src/screenshots/3-OTP-Verification.jpg?raw=true) | ![Screenshot 2](https://github.com/nikhilyadav-dev/multi-authentication-node/blob/main/1-JWT/client/src/screenshots/4-OTP-Verification-Mail.jpg?raw=true) |
| *OTP Verification* | *OTP Mail* |

| Screenshot 5 | Screenshot 6 |
|--------------|--------------|
| ![Screenshot 1](https://github.com/nikhilyadav-dev/multi-authentication-node/blob/main/1-JWT/client/src/screenshots/5--Forgot-Password.jpg?raw=true) | ![Screenshot 2](https://github.com/nikhilyadav-dev/multi-authentication-node/blob/main/1-JWT/client/src/screenshots/6-Reset-Password-Mail.jpg?raw=true) |
| *Forgot Password* | *Reset Password Mail* |

  ---

  ## 💻 Tech Stack

<div align="center">

### 🎨 Frontend

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Language-FFD600?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)


### ⚙️ Backend

[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![REST API](https://img.shields.io/badge/REST-API-02569B?style=for-the-badge&logo=fastapi&logoColor=white)](https://restfulapi.net/)

### 🗄️ Database

[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

### 🔐 Authentication & Services

[![JWT](https://img.shields.io/badge/JWT-Authentication-red?style=for-the-badge&logo=json-web-tokens)](https://jwt.io/)
[![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-8A2BE2?style=for-the-badge)](https://www.npmjs.com/package/bcrypt)
[![Twilio](https://img.shields.io/badge/Twilio-Phone%20OTP-F22F46?style=for-the-badge&logo=twilio&logoColor=white)](https://www.twilio.com/)
[![NodeMailer](https://img.shields.io/badge/NodeMailer-Email%20OTP-0A66C2?style=for-the-badge&logo=gmail&logoColor=white)](https://nodemailer.com/)
[![dotenv](https://img.shields.io/badge/dotenv-Environment%20Config-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)](https://www.npmjs.com/package/dotenv)

</div>


  ---

 ## 🔄 User Workflow

 - **1. Register** – User signs up with email & phone number. 
 - **2. OTP Verification** – System generates a secure OTP and sends it via Email (NodeMailer) or Phone (Twilio). Account is activated after successful verification.
- **3. Login** – User logs in with credentials. Server validates data and issues a JWT token.
 - **4. Access Protected Routes** – JWT is verified by authentication middleware to securely access user-specific data.
 - **5. Forgot / Reset Password** – User requests password reset, verifies via OTP/token, and sets a new password securely.
 - **6. Logout** – Token is cleared and session ends safely.

   ---

### 📁 Detailed Project Structure

```

1-JWT/
│
├── 🎨 client/                              # React frontend (Vite-based UI)
│   │
│   ├── 📦 dist/                            # Production build output
│   │   ├── assets/                         # Optimized CSS & JS bundles
│   │   └── index.html                      # Production entry HTML
│   │
│   ├── 🌐 public/                          # Static public assets
│   │   └── vite.svg                        # Vite logo
│   │
│   ├── 🧠 src/                             # Main frontend source code
│   │   │
│   │   ├── assets/                         # Static images & icons
│   │   │   └── react.svg
│   │   │
│   │   ├── 🧩 components/                  # Reusable UI components
│   │   │   ├── Login.jsx                   # Login form component
│   │   │   └── Register.jsx                # Registration form component
│   │   │
│   │   ├── 📄 pages/                       # Page-level components
│   │   │   ├── Auth.jsx                    # Combined auth layout
│   │   │   ├── Home.jsx                    # Home page
│   │   │   ├── OtpVerification.jsx         # OTP verification screen
│   │   │   ├── ForgotPassword.jsx          # Forgot password page
│   │   │   └── ResetPassword.jsx           # Reset password UI
│   │   │
│   │   ├── 🎨 styles/                      # Modular CSS styling
│   │   │   ├── Auth.css
│   │   │   ├── Home.css
│   │   │   ├── OtpVerification.css
│   │   │   ├── ForgotPassword.css
│   │   │   ├── ResetPassword.css
│   │   │   └── (Other UI styles)
│   │   │
│   │   ├── 📸 screenshots/                 # Demo screenshots for README
│   │   │   ├── 1-Login.jpg
│   │   │   ├── 2-Signup.jpg
│   │   │   ├── 3-OTP-Verification.jpg
│   │   │   ├── 4-OTP-Verification-Mail.jpg
│   │   │   ├── 5-Forgot-Password.jpg
│   │   │   ├── 6-Reset-Password-Mail.jpg
│   │   │   └── 7-Reset-Password.jpg
│   │   │
│   │   ├── App.jsx                         # Root React component
│   │   ├── main.jsx                        # React entry point
│   │   └── App.css                         # Global styles
│   │
│   ├── vite.config.js                      # Vite configuration
│   ├── package.json                        # Frontend dependencies
│   └── README.md                           # Frontend documentation
│
├── ⚙️ server/                              # Node.js + Express backend
│   │
│   ├── 🎮 controllers/                     # Core authentication logic
│   │   └── userControllers.js              # Register, Login, OTP, Reset logic
│   │
│   ├── 🧱 models/                          # Mongoose schemas
│   │   └── userModel.js                    # User schema (auth fields + OTP)
│   │
│   ├── 🚏 routes/                          # API route definitions
│   │   └── userRouter.js                   # User authentication routes
│   │
│   ├── 🛡️ middleware/                      # Custom middleware
│   │   ├── isAuthenticated.js              # JWT verification middleware
│   │   ├── error.js                        # Central error handler
│   │   └── wrapAsync.js                    # Async error wrapper
│   │
│   ├── 🗄️ database/                        # Database configuration
│   │   └── dbConnection.js                 # MongoDB connection setup
│   │
│   ├── 🛠️ utils/                           # Helper utilities
│   │   ├── sendEmail.js                    # Send OTP via NodeMailer
│   │   └── sendToken.js                    # Generate & send JWT token
│   │
│   ├── app.js                              # Express app configuration
│   ├── server.js                           # Server entry point
│   ├── .env                                # Environment variables
│   └── package.json                        # Backend dependencies
│
└── 🔧 Root Files
    ├── .gitignore                          # Ignored files

```
---

## 🏗️ Architecture Summary

🎨 **Frontend (React + Vite)** → Handles UI, forms, API requests

⚙️ **Backend (Express.js)** → Handles authentication & business logic

🗄️ **MongoDB** → Stores user data securely

🔐 **JWT** → Token-based authentication

📲 **Twilio + NodeMailer** → OTP verification system

---

## 📦 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/nikhilyadav-dev/multi-authentication-node.git
cd 1-JWT
```
### 2️⃣ Setup Backend (Server)
```bash
cd server
npm install
```

🔐 Create .env File Inside server/
```bash

# Server Configuration
PORT=8000
FRONTEND_URL=http://localhost:5173

# Database Configuration
MONGO_URL=mongodb://127.0.0.1:27017/your_database_name

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Email Configuration (NodeMailer)
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Twilio Configuration (OTP via Phone)
TWILIO_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number


👉 Replace the values with your actual credentials.
```

▶️ Run Backend Server

```bash
npm run dev
```

3️⃣ Setup Frontend (Client)

Open a new terminal:

```bash
cd client
npm install
```

▶️ Run Frontend
```bash
npm run dev
```

4️⃣ Access the Application
Open your browser and visit:
```bash

http://localhost:5173

```

---



<div align="center">

### 💼 Connect with Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nikhilyadav-developer)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nikhilyadav-dev)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:nikhilyadav.prof@gmail.com)

**⭐ If you found this project helpful, consider giving it a star!**

</div>
