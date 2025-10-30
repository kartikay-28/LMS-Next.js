# Postman Testing Guide for User Registration API

## 🚀 API Endpoint Overview

**Endpoint:** `POST http://localhost:3000/api/register`  
**Purpose:** Register new users in the LMS platform with secure password hashing and MongoDB storage

## ✅ API Features Implemented

- ✅ **Input Validation**: name, email, password, role
- ✅ **Email Format Validation**: Regex pattern matching
- ✅ **Password Security**: bcryptjs hashing with 12 salt rounds
- ✅ **Duplicate Prevention**: Checks for existing users
- ✅ **MongoDB Integration**: Stores users with timestamps
- ✅ **Error Handling**: Comprehensive error responses
- ✅ **Security**: Password excluded from response

## 📋 Test Cases for Postman

### 1. **Successful Registration**
```json
POST http://localhost:3000/api/register
Content-Type: application/json

{
  "name": "Kalvian Tester",
  "email": "kalvian@example.com",
  "password": "secure123",
  "role": "student"
}
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "67209abc123def456789",
    "name": "Kalvian Tester",
    "email": "kalvian@example.com",
    "role": "student",
    "createdAt": "2024-10-29T12:00:00.000Z"
  }
}
```

### 2. **Admin User Registration**
```json
{
  "name": "Admin User",
  "email": "admin.test@example.com",
  "password": "adminpass123",
  "role": "admin"
}
```

### 3. **Missing Fields Validation**
```json
{
  "name": "Test User",
  "email": "test@example.com"
  // Missing password and role
}
```

**Expected Response (400):**
```json
{
  "error": "All fields are required"
}
```

### 4. **Invalid Email Format**
```json
{
  "name": "Test User",
  "email": "invalid-email",
  "password": "password123",
  "role": "student"
}
```

**Expected Response (400):**
```json
{
  "error": "Please enter a valid email address"
}
```

### 5. **Short Password**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123",
  "role": "student"
}
```

**Expected Response (400):**
```json
{
  "error": "Password must be at least 6 characters long"
}
```

### 6. **Invalid Role**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "teacher"
}
```

**Expected Response (400):**
```json
{
  "error": "Role must be either student or admin"
}
```

### 7. **Duplicate Email**
```json
{
  "name": "Another User",
  "email": "kalvian@example.com",  // Same as test case 1
  "password": "password123",
  "role": "student"
}
```

**Expected Response (409):**
```json
{
  "error": "User with this email already exists"
}
```

## 🛠 Postman Setup Instructions

### Step 1: Download and Install Postman
1. Visit [postman.com/downloads](https://www.postman.com/downloads)
2. Download for your operating system
3. Install and open the application

### Step 2: Create New Request
1. Click "New" → "HTTP Request"
2. Set method to **POST**
3. Enter URL: `http://localhost:3000/api/register`

### Step 3: Configure Headers
1. Go to "Headers" tab
2. Add: `Content-Type: application/json`

### Step 4: Set Request Body
1. Go to "Body" tab
2. Select "raw"
3. Choose "JSON" from dropdown
4. Paste test JSON data

### Step 5: Send Request
1. Click "Send" button
2. Check response in bottom panel
3. Verify status code and response body

## 🔍 What to Look For

### ✅ Success Indicators:
- **Status Code**: 201 Created
- **Response Structure**: Contains `message` and `user` fields
- **User Object**: Has `id`, `name`, `email`, `role`, `createdAt`
- **Security**: No `password` field in response
- **Console Logs**: Registration success logs in terminal

### ❌ Error Indicators:
- **Status Codes**: 400 (validation), 409 (duplicate), 500 (server error)
- **Error Messages**: Clear, descriptive error descriptions
- **Console Logs**: Error logs with details

## 📊 Additional Testing Endpoints

### Get All Users (Debug)
```
GET http://localhost:3000/api/register
```
Returns list of all registered users (passwords excluded)

### Seed Database
```
POST http://localhost:3000/api/seed
```
Creates initial demo users for testing

## 🔧 Troubleshooting

### Common Issues:
1. **Connection Refused**: Ensure dev server is running (`npm run dev`)
2. **MongoDB Errors**: Check `.env.local` has correct `MONGODB_URI`
3. **Validation Errors**: Verify all required fields are included
4. **CORS Issues**: API routes handle CORS automatically in Next.js

### Debug Steps:
1. Check terminal for console logs
2. Verify MongoDB connection in logs
3. Test with simple GET request first
4. Ensure JSON format is valid

## 📝 Terminal Logs to Expect

**Successful Registration:**
```
📝 Registration attempt: { name: 'Kalvian Tester', email: 'kalvian@example.com', role: 'student' }
✅ User registered successfully:
   ID: 67209abc123def456789
   Name: Kalvian Tester
   Email: kalvian@example.com
   Role: student
   Created: 2024-10-29T12:00:00.000Z
---
```

**Validation Error:**
```
📝 Registration attempt: { name: 'Test', email: 'invalid', role: 'student' }
❌ Validation failed: Invalid email format
```

## 🎯 Success Criteria

Your API is working correctly if:
- ✅ All test cases return expected responses
- ✅ Users are stored in MongoDB with hashed passwords
- ✅ Validation prevents invalid data
- ✅ Duplicate emails are rejected
- ✅ Console logs show detailed information
- ✅ Response excludes sensitive data (password)

## 📸 Screenshots Needed

For submission, capture:
1. **Code Screenshot**: `/app/api/register/route.js` file
2. **Postman Success**: Request and 201 response
3. **Terminal Logs**: Registration success output
4. **Optional**: Error test case responses

---

**Ready to test!** 🚀 Your registration API is fully functional and secure!