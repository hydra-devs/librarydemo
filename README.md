
# 📚 Library Demo API

A simple Express.js library management demo with basic authentication and book management features.

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 📖 Book Management (CRUD)
- 🧩 Modular Express.js architecture
- 🛡️ Input validation and error handling

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- dotenv for configuration

## 📁 Project Structure

- `server/` - Contains the Express.js server and routes
- `models/` - Mongoose models for User and Book
- `controller/` - Controller functions for each route
- `middleware/` - Custom middleware for error handling and authentication
- `utils/` - Utility functions for creating errors and hashing passwords
- `config/` - Configuration files for environment variables and database connection
- `routes/` - Express.js route definitions

# Method | Endpoint | Description
- `POST` | /api/auth/register | Register a new user
- `POST` | /api/auth/login | Login
- `POST` | /api/library/create | Create a new book
- `GET` | /api/library/viewbooks | Retrieve all books
- `POST` | /api/library/mybook | Retreive loggedin user book
- `GET` | /api/library/viewbook/:id | Retreive a book by ID
- `DELETE` | /api/library/delete/:id | Delete a book by ID

