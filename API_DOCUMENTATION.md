# LMS API Documentation

This document provides complete details of all API endpoints available in the LMS API project.

---

## 🌐 Server Configuration & Base URL

- **Base URL:** `http://localhost:8000` *(Default or as configured via `PORT` in `.env`)*
- **Static Assets:** `http://localhost:8000/uploads/<filename>`

---

## 🔐 Authentication & Authorization

- **Global Protection:** All routes require a valid JWT Bearer token unless explicitly marked as **Public**.
- **Auth Header:**
  ```http
  Authorization: Bearer <your_jwt_token>
  ```
- **Available User Roles:**
  - `admin`
  - `student` *(default)*
  - `mentor`
  - `moderator`
  - `developer`
  - `manager`
  - `hr`
  - `project_manager`

---

## 📑 Table of Contents
1. [General / Root API](#1-general--root-api)
2. [Authentication APIs (`/auth`)](#2-authentication-apis-auth)
3. [Users APIs (`/users`)](#3-users-apis-users)
4. [File Uploads API (`/upload`)](#4-file-uploads-api-upload)

---

## 1. General / Root API

### 🔹 Health Check / Hello
- **Endpoint:** `GET /`
- **Access:** Public
- **Description:** Basic root check to verify the API server is online.
- **Response:**
  ```text
  Hello World!
  ```

---

## 2. Authentication APIs (`/auth`)

### 🔹 Send Login OTP
- **Endpoint:** `POST /auth/send-otp`
- **Access:** Public
- **Description:** Sends a 6-digit OTP code to the provided phone number for OTP-based login.
- **Request Body:**
  ```json
  {
    "phone": "01700000000"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "OTP sent successfully"
  }
  ```

---

### 🔹 Verify OTP & Login
- **Endpoint:** `POST /auth/verify-otp`
- **Access:** Public
- **Description:** Verifies the OTP code and returns an authentication JWT token.
- **Request Body:**
  ```json
  {
    "phone": "01700000000",
    "otpCode": "123456",
    "device": "Chrome on Windows"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "Login successful",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "uuid-here",
        "name": "User Name",
        "email": "user@example.com",
        "phone": "01700000000",
        "role": "student"
      }
    }
  }
  ```

---

### 🔹 Email & Password Login
- **Endpoint:** `POST /auth/login`
- **Access:** Public
- **Description:** Authenticates a user using email and password.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "device": "Chrome on Windows"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "Login successful",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "uuid-here",
        "name": "User Name",
        "email": "user@example.com",
        "role": "student"
      }
    }
  }
  ```

---

### 🔹 Forgot Password (Send OTP)
- **Endpoint:** `POST /auth/forgot-password`
- **Access:** Public
- **Description:** Requests a password reset OTP for a registered phone number.
- **Request Body:**
  ```json
  {
    "phone": "01700000000"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "Password reset OTP sent successfully"
  }
  ```

---

### 🔹 Reset Password
- **Endpoint:** `POST /auth/reset-password`
- **Access:** Public
- **Description:** Resets the password using the OTP received.
- **Request Body:**
  ```json
  {
    "phone": "01700000000",
    "otpCode": "123456",
    "newPassword": "newSecurePassword123"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "Password reset successfully"
  }
  ```

---

### 🔹 Get Current User Profile
- **Endpoint:** `GET /auth/me`
- **Access:** Protected (JWT Token Required)
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Returns profile details of the authenticated user decoded from token.
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "user": {
      "id": "uuid-here",
      "email": "user@example.com",
      "role": "student"
    }
  }
  ```

---

### 🔹 Logout (Current Device)
- **Endpoint:** `POST /auth/logout`
- **Access:** Protected (JWT Token Required)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body (Optional):**
  ```json
  {
    "device": "Chrome on Windows"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "Logged out successfully"
  }
  ```

---

### 🔹 Logout All Devices
- **Endpoint:** `POST /auth/logout-all`
- **Access:** Protected (JWT Token Required)
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Clears all active device sessions for the authenticated user.
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "Logged out from all devices successfully"
  }
  ```

---

## 3. Users APIs (`/users`)

### 🔹 Create User (Register)
- **Endpoint:** `POST /users`
- **Access:** Public
- **Description:** Creates a new user account.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "01700000000",
    "role": "student"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "statusCode": 201,
    "message": "User created successfully",
    "data": {
      "id": "uuid-here",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "01700000000",
      "role": "student",
      "isBanned": false,
      "createdAt": "2026-08-31T01:00:00.000Z",
      "updatedAt": "2026-08-31T01:00:00.000Z"
    }
  }
  ```

---

### 🔹 Get All Users
- **Endpoint:** `GET /users`
- **Access:** Protected (`admin`, `moderator`, `developer`)
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Returns a list of all registered users.
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "Users retrieved successfully",
    "data": [
      {
        "id": "uuid-here",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "isBanned": false,
        "createdAt": "2026-08-31T01:00:00.000Z"
      }
    ]
  }
  ```

---

### 🔹 Get User by ID
- **Endpoint:** `GET /users/:id`
- **Access:** Protected (JWT Token Required)
- **Headers:** `Authorization: Bearer <token>`
- **Path Parameter:** `id` (UUID)
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "User retrieved successfully",
    "data": {
      "id": "uuid-here",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "01700000000",
      "role": "student",
      "isBanned": false
    }
  }
  ```

---

### 🔹 Update User
- **Endpoint:** `PATCH /users/:id`
- **Access:** Protected (JWT Token Required)
- **Headers:** `Authorization: Bearer <token>`
- **Path Parameter:** `id` (UUID)
- **Request Body (Partial):**
  ```json
  {
    "name": "John Updated",
    "phone": "01800000000"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "User updated successfully",
    "data": {
      "id": "uuid-here",
      "name": "John Updated",
      "email": "john@example.com",
      "phone": "01800000000"
    }
  }
  ```

---

### 🔹 Delete User (Soft Delete)
- **Endpoint:** `DELETE /users/:id`
- **Access:** Protected (`admin`, `moderator`, `developer`)
- **Headers:** `Authorization: Bearer <token>`
- **Path Parameter:** `id` (UUID)
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "User deleted successfully",
    "data": {
      "id": "uuid-here"
    }
  }
  ```

---

### 🔹 Ban User
- **Endpoint:** `PATCH /users/:id/ban`
- **Access:** Protected (`admin`, `moderator`, `developer`)
- **Headers:** `Authorization: Bearer <token>`
- **Path Parameter:** `id` (UUID)
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "User banned successfully",
    "data": {
      "id": "uuid-here",
      "isBanned": true,
      "bannedAt": "2026-08-31T01:30:00.000Z"
    }
  }
  ```

---

### 🔹 Unban User
- **Endpoint:** `PATCH /users/:id/unban`
- **Access:** Protected (`admin`, `moderator`, `developer`)
- **Headers:** `Authorization: Bearer <token>`
- **Path Parameter:** `id` (UUID)
- **Success Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "message": "User unbanned successfully",
    "data": {
      "id": "uuid-here",
      "isBanned": false,
      "bannedAt": null
    }
  }
  ```

---

## 4. File Uploads API (`/upload`)

### 🔹 Upload File / Image
- **Endpoint:** `POST /upload`
- **Access:** Public
- **Content-Type:** `multipart/form-data`
- **Form Field:** `file` *(Binary image file)*
- **Allowed Extensions:** `.jpg`, `.jpeg`, `.png`, `.gif`
- **Success Response (201 Created):**
  ```json
  {
    "statusCode": 201,
    "message": "File uploaded successfully",
    "data": {
      "url": "http://localhost:8000/uploads/c7b5a83a-86c2-4820-911e-05a81a7b1b36.png",
      "filename": "c7b5a83a-86c2-4820-911e-05a81a7b1b36.png"
    }
  }
  ```
