## 🎬 Movie API — Backend CRUD with JWT Authentication

A modular, validation-driven, and authentication-secured Movie API built using Node.js, Express, and MongoDB.
This project was developed as part of the TAMK Full Stack course and upgraded in Week 5 to include professional backend practices.

## ⭐ Overview

This API allows clients to:
📄 Retrieve all movies
🔍 Get a movie by ID
➕ Create new movies (authenticated)
✏️ Update existing movies (authenticated)
🗑️ Delete movies (authenticated)

All modifying operations are protected using JWT Bearer tokens, and movie input is validated using Joi.

## 🚀 Features

### 🎥 Movie API Features
- Public read endpoints (GET /movies, GET /movies/:id)
- Query-based filtering (title, director, year)
- Protected endpoints for creating, updating, and deleting movies
- MongoDB ObjectId validation

### 🔐 Authentication Features
- User signup with bcrypt password hashing
- Login that returns a JWT token (valid for 1 hour)
- Authorization middleware to protect routes
- Clean separation between public and private endpoints

### 🛡️ Validation & Middleware
- Joi validation for movie payloads
- Validation for query parameters (e.g., year must be an integer)
- Request logging middleware for development
- Centralized error handling patterns

### 🧱 Tech Stack
- Node.js
- Express.js
- MongoDB
- Joi (validation)
- JSON Web Tokens (JWT)
- bcrypt
- dotenv
- VS Code REST Client / Postman

## 📁 Project Structure

movie-api/
│── .gitignore
│── .env
│── README.md
│── api.http
│── app.js
│── package-lock.json
│── package.json
│
├── config/
│     └── dbConfig.js
│
├── controllers/
│     ├── authController.js
│     └── moviesController.js
│
├── data/
│     └── mockUsers.js
│
├── middleware/
│     ├── authenticateToken.js
│     ├── logger.js
│     └── validateMovie.js
│
├── node_modules/
│
└── routes/
      ├── authentication.js
      └── movies.js


Why this matters:
Each layer (routes → controllers → middleware → database) has a clear responsibility, which makes the code easy to maintain and extend.

## 🔌 API Endpoints

### 📚 Public Endpoints
GET /movies
GET /movies/:id

### 🔑 Authentication
POST /auth/signup
POST /auth/login

### 🔒 Protected Endpoints

Send tokens via: Authorization: Bearer <token>

POST /movies
PUT /movies/:id
DELETE /movies/:id

## 🛠️ Installation & Setup

### 1. Clone the repository
git clone https://github.com/marahim34/movie-api
cd movie-api

### 2. Install dependencies
npm install

### 3. Create a .env file
PORT=3000
MONGODB_URI=your-mongodb-connection-string
DBNAME=your-database-name
DBCOLLECTION=movies
JWT_SECRET=your-secret-key

### 4. Start the server
npm start


Your API will be available at:

http://localhost:3000

## 🧪 Testing the API

Use the included api.http (VS Code REST Client) or Postman.

Recommended testing flow:

1. Sign up using /auth/signup
2. Log in using /auth/login → receive JWT token
3. Use the token for protected routes:
    POST /movies
    PUT /movies/:id
    DELETE /movies/:id

4. Test invalid data to confirm Joi validation works
5. Test without token to confirm authentication is enforced