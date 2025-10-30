# MongoDB Setup Guide

## Files Created

### 1. User Model (`/app/models/User.js`)
- Mongoose schema with name, email, password, role fields
- Validation and unique constraints
- Timestamps enabled
- Console log: "User model loaded successfully: true"

### 2. Updated API Routes
- `/app/api/register/route.js` - Now uses MongoDB with password hashing
- `/app/api/signin/route.js` - Authentication with bcrypt password verification

### 3. MongoDB Connection (`/utils/mongodb.js`)
- Connection utility with caching
- Error handling and logging

### 4. Environment Variables (`.env.local`)
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lms-database?retryWrites=true&w=majority
```

## Setup Steps

### 1. MongoDB Atlas Setup
1. Go to https://www.mongodb.com/atlas
2. Create a cluster
3. Choose "Connect → Connect your application"
4. Copy the connection string
5. Replace the MONGODB_URI in `.env.local`

### 2. Whitelist IP Address
- In MongoDB Atlas, go to Network Access
- Add your IP address (or 0.0.0.0/0 for development)

### 3. Test the Connection
- Start the server: `npm run dev`
- Check console for: "✅ MongoDB connection established"
- Check console for: "User model loaded successfully: true"

## Testing

### Registration
- Go to `/signup`
- Create a new user
- Check terminal for registration logs

### Sign In
- Go to `/signin`
- Use demo credentials:
  - Admin: admin@example.com / password
  - Student: student@example.com / password

### API Endpoints
- `POST /api/register` - Register new user
- `POST /api/signin` - Sign in user
- `GET /api/register` - View all users (debug)

## Features
- ✅ Password hashing with bcrypt
- ✅ MongoDB connection with caching
- ✅ User model with validation
- ✅ Error handling and logging
- ✅ Role-based authentication
- ✅ Duplicate email prevention