# Category, Product, and Order Management System

## Overview

A RESTful API built with **Node.js** and **Express** for managing categories, products, and orders. The system provides role-based access control and secure authentication with **JWT**. It uses **MongoDB** for data storage and supports CRUD operations with proper validation.

## Features

✅ Category management (Create, Read, Update, Delete)\
✅ Product management with category association\
✅ Order processing with multiple items\
✅ Role-based access control (Admin, Moderator, User)\
✅ Secure authentication using **JWT**\
✅ Data validation for integrity\
✅ Environment-based configuration support

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Validation:** Joi / Mongoose
- **Authentication:** JWT
- **Security:** Bcrypt for password hashing

## Installation

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/HassanEssam0110/Task-4-Nodejs-Order-System.git
   cd Task-4-Nodejs-Order-System
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Create `.env.development.local` and `.env.production.local` inside the `config` folder.
   - Example `.env` files are provided below.

## Environment Variables

Environment variables are stored in the `config` folder.

### `.env.development.local`

```env
#PORT
PORT=3000

# ENVIRONMENT
NODE_ENV="development"

# Database
MONGO_DB_URI="mongodb://127.0.0.1:27017/DB_orders_management"

# JWT
JWT_SECRET="secret"
JWT_EXPIRES_IN="30d"
JWT_COOKIES_EXPIRES_IN=30

# BCRYPT
SALT_ROUNDS=10
```

### `.env.production.local`

```env
#PORT
PORT=4000

# ENVIRONMENT
NODE_ENV="production"

# Database
MONGO_DB_URI="mongodb://127.0.0.1:27017/DB_orders_management"

# JWT
JWT_SECRET="secretJWT_Hassan"
JWT_EXPIRES_IN="30d"
JWT_COOKIES_EXPIRES_IN=30

# BCRYPT
SALT_ROUNDS=10
```

## Running the Application

### Development Mode

```sh
npm run start:dev
```

### Production Mode

```sh
npm run start:prod
```

## Usage

### API Base URL

- Development: `http://localhost:3000`
- Production: `http://localhost:4000`

### Authentication

- Obtain a JWT token by logging in and include it in the `cookies` for protected routes.

  **OR**

- Obtain a JWT token by logging in and include it in the `Authorization` header for protected routes.

## API Endpoints

All endpoints are prefixed with `/api/v1`

### **Authentication**

| Method | Endpoint                | Access                |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/v1/auth/register` | Public                |
| POST   | `/api/v1/auth/login`    | Public                |
| GET    | `/api/v1/auth/me`       | Admin, Moderator,User |

#### Register a New User

**POST** `/api/v1/auth/register`

```json
{
  "username": "Jhon Deo",
  "email": "test202@mail.com",
  "password": "Asd@1234",
  "repeat_password": "Asd@1234"
}
```

#### Login

**POST** `/api/v1/auth/login`

```json
{
  "email": "test202@mail.com",
  "password": "Asd@1234"
}
```

#### Get Current User

**GET** api/v1/auth/me

Requires authentication with a valid token.

### **Categories**

| Method | Endpoint                 | Access           |
| ------ | ------------------------ | ---------------- |
| POST   | `/api/v1/categories`     | Admin            |
| GET    | `/api/v1/categories`     | Public           |
| GET    | `/api/v1/categories/:id` | Public           |
| PUT    | `/api/v1/categories/:id` | Admin, Moderator |
| DELETE | `/api/v1/categories/:id` | Admin            |

#### Create a New Category

**POST** `/api/v1/categories`

**Parent**

```json
{
  "name": "Home & Kitchen",
  "parentCategoryId": null
}
```

**Child**

```json
{
  "name": "Kitchen Appliances",
  "parentCategoryId": "67d3110879cd0a84f150076c"
}
```

### **Products**

| Method | Endpoint               | Access           |
| ------ | ---------------------- | ---------------- |
| POST   | `/api/v1/products`     | Admin            |
| GET    | `/api/v1/products`     | Public           |
| GET    | `/api/v1/products/:id` | Public           |
| PUT    | `/api/v1/products/:id` | Admin, Moderator |
| DELETE | `/api/v1/products/:id` | Admin            |

#### Create a New Product

**POST** `/api/v1/products`

```json
{
  "name": "Non-Stick Cookware Set",
  "price": 180,
  "categories": ["67d3132e0e3d32c0fa5c49bf"]
}
```

### **Orders**

| Method | Endpoint             | Access                 |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/v1/orders`     | User                   |
| GET    | `/api/v1/orders`     | Admin, Moderator       |
| GET    | `/api/v1/orders/:id` | Admin, Moderator, User |
| PUT    | `/api/v1/orders/:id` | Admin, Moderator       |
| DELETE | `/api/v1/orders/:id` | Admin                  |

#### Create a New Order

**POST** `/api/v1/orders`

```json
{
  "user": "67d3148c12b82111fba28264",
  "items": [
    {
      "product": "67d3163e332c923435b8c6f0",
      "quantity": 2
    },
    {
      "product": "67d3168a332c923435b8c6f8",
      "quantity": 1
    }
  ]
}
```

## Role-Based Access Control

- **Admin**: Can perform all operations.
- **Moderator**: Can create and update products and orders.
- **User**: Can only read data (GET requests).

## Error Handling

The API returns appropriate HTTP status codes and messages for different scenarios:

- **400**: Bad Request
- **401**: Unauthorized (e.g., missing or invalid token)
- **403**: Forbidden (e.g., insufficient permissions)
- **404**: Not Found (e.g., resource does not exist)
- **422**: Unprocessable Entity (e.g., validation errors)
- **500**: Internal Server Error

## Dependencies

```json
{
  "bcryptjs": "^3.0.2",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "joi": "^17.13.3",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.12.1",
  "morgan": "^1.10.0"
}
```

---

🚀 **Happy Coding!** 🚀
