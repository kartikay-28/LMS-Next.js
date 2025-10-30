# Registration System Testing Guide

## Overview
This registration system includes:
- Custom API route at `/api/register`
- Sign-up form at `/signup`
- Mock user storage (in-memory array)
- Full validation and error handling

## Testing the Registration System

### 1. Access the Sign-Up Form
Navigate to: `http://localhost:3000/signup`

### 2. Test Cases to Try

#### Valid Registration:
- **Name:** John Doe
- **Email:** john.doe@example.com
- **Password:** password123
- **Role:** student

#### Invalid Email Format:
- **Email:** invalid-email (should show validation error)

#### Short Password:
- **Password:** 123 (should show "Password must be at least 6 characters" error)

#### Duplicate Email:
Try registering with `admin@example.com` or `student@example.com` (already exists)

#### Missing Fields:
Leave any field empty to test required field validation

### 3. API Endpoint Testing

#### Direct API Test:
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "password123",
    "role": "student"
  }'
```

#### View All Users:
```bash
curl http://localhost:3000/api/register
```

### 4. Console Output
Check the terminal running the Next.js server to see:
- Registration attempts logged with 📝
- Validation failures with ❌
- Successful registrations with ✅
- User details and total user count

### 5. Expected Behavior
1. **Successful Registration:**
   - Shows success message
   - Redirects to `/signin` after 2 seconds
   - Logs user details to terminal

2. **Validation Errors:**
   - Shows specific error messages
   - Prevents form submission
   - Highlights invalid fields

3. **API Responses:**
   - `201` for successful registration
   - `400` for validation errors
   - `409` for duplicate email
   - `500` for server errors

## File Structure
```
app/
├── api/
│   └── register/
│       └── route.js          # API endpoint
├── signup/
│   └── page.jsx             # Sign-up form
components/
└── global/
    ├── input-field.jsx      # Reusable input component
    └── button.jsx           # Reusable button component
```

## Mock Data
The system starts with 2 pre-existing users:
- admin@example.com (admin role)
- student@example.com (student role)

All new registrations are stored in memory and will be lost when the server restarts.