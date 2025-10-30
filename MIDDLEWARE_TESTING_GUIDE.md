# Middleware-Based Route Protection Testing Guide

## 🛡️ Implementation Overview

### ✅ Features Implemented:
1. **Global Middleware Protection** using `next-auth/jwt`
2. **Role-Based Access Control** for admin/student dashboards
3. **Automatic Redirections** based on user role
4. **Comprehensive Logging** of all access attempts
5. **Unauthenticated User Handling** with signin redirects

## 📁 File Structure

```
lms-project/
├── middleware.js              # Global middleware (project root)
├── .env.local                # NextAuth secret configuration
├── app/
│   ├── api/auth/[...nextauth]/route.js  # NextAuth configuration
│   ├── admin-dashboard/       # Protected admin routes
│   ├── student-dashboard/     # Protected student routes
│   └── signin/               # Authentication page
└── components/
    └── auth/protected-route.jsx  # Component-level protection
```

## 🔧 Middleware Configuration

### Route Matcher:
```javascript
export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/student-dashboard/:path*'
  ]
};
```

### Protection Logic:
1. **Check Authentication**: Verify JWT token exists
2. **Extract Role**: Get user role from token
3. **Validate Access**: Ensure role matches route requirements
4. **Log Activity**: Record all access attempts and decisions
5. **Redirect**: Send users to appropriate pages

## 🧪 Test Scenarios

### Test 1: Unauthenticated User Access
**Setup**: Clear cookies or use incognito mode

#### Test 1a: Access Admin Dashboard
```
URL: http://localhost:3000/admin-dashboard
Expected: Redirect to /signin?callbackUrl=/admin-dashboard
```

#### Test 1b: Access Student Dashboard
```
URL: http://localhost:3000/student-dashboard
Expected: Redirect to /signin?callbackUrl=/student-dashboard
```

**Expected Terminal Logs:**
```
🔒 Middleware: Checking access to /admin-dashboard
❌ Unauthorized access attempt to /admin-dashboard - No token found
   Redirecting to /signin
```

### Test 2: Admin User Access
**Setup**: Sign in as admin user

#### Test 2a: Admin Accessing Admin Dashboard
```
URL: http://localhost:3000/admin-dashboard
Expected: Access granted
```

#### Test 2b: Admin Accessing Student Dashboard
```
URL: http://localhost:3000/student-dashboard
Expected: Redirect to /admin-dashboard
```

**Expected Terminal Logs:**
```
🔒 Middleware: Checking access to /student-dashboard
👤 User role: admin, accessing: /student-dashboard
❌ Access denied: admin user trying to access student dashboard
   Redirecting to /admin-dashboard
```

### Test 3: Student User Access
**Setup**: Sign in as student user

#### Test 3a: Student Accessing Student Dashboard
```
URL: http://localhost:3000/student-dashboard
Expected: Access granted
```

#### Test 3b: Student Accessing Admin Dashboard
```
URL: http://localhost:3000/admin-dashboard
Expected: Redirect to /student-dashboard
```

**Expected Terminal Logs:**
```
🔒 Middleware: Checking access to /admin-dashboard
👤 User role: student, accessing: /admin-dashboard
❌ Access denied: student user trying to access admin dashboard
   Redirecting to /student-dashboard
```

## 🔍 Testing Steps

### Step 1: Prepare Test Users
1. Register or use existing admin user: `admin@example.com`
2. Register or use existing student user: `student@example.com`
3. Ensure both users exist in database

### Step 2: Test Unauthenticated Access
1. Open incognito/private browser window
2. Navigate to `http://localhost:3000/admin-dashboard`
3. Verify redirect to signin page
4. Check terminal for unauthorized access logs
5. Repeat for student dashboard

### Step 3: Test Admin User
1. Sign in as admin user
2. Navigate to `http://localhost:3000/admin-dashboard` (should work)
3. Navigate to `http://localhost:3000/student-dashboard` (should redirect)
4. Check terminal for role-based access logs

### Step 4: Test Student User
1. Sign out and sign in as student user
2. Navigate to `http://localhost:3000/student-dashboard` (should work)
3. Navigate to `http://localhost:3000/admin-dashboard` (should redirect)
4. Check terminal for role-based access logs

## 📊 Expected Terminal Output

### Complete Test Session Example:
```bash
# Unauthenticated access
🔒 Middleware: Checking access to /admin-dashboard
❌ Unauthorized access attempt to /admin-dashboard - No token found
   Redirecting to /signin

# Admin accessing student dashboard
🔒 Middleware: Checking access to /student-dashboard
👤 User role: admin, accessing: /student-dashboard
❌ Access denied: admin user trying to access student dashboard
   Redirecting to /admin-dashboard

# Student accessing admin dashboard
🔒 Middleware: Checking access to /admin-dashboard
👤 User role: student, accessing: /admin-dashboard
❌ Access denied: student user trying to access admin dashboard
   Redirecting to /student-dashboard

# Successful access
🔒 Middleware: Checking access to /admin-dashboard
👤 User role: admin, accessing: /admin-dashboard
✅ Admin access granted to admin dashboard
✅ Access granted to /admin-dashboard
```

## 🛠️ Troubleshooting

### Common Issues:

#### 1. Middleware Not Running
- **Check**: `middleware.js` is in project root (same level as `next.config.js`)
- **Verify**: File name is exactly `middleware.js`
- **Restart**: Development server after creating middleware

#### 2. Token Not Found
- **Check**: `NEXTAUTH_SECRET` in `.env.local`
- **Verify**: User is properly signed in
- **Debug**: Check browser cookies for `next-auth.session-token`

#### 3. Role Not Available
- **Check**: NextAuth JWT callback includes role
- **Verify**: User registration includes role field
- **Debug**: Console log token contents in middleware

#### 4. Infinite Redirects
- **Check**: Route paths match exactly (`/admin-dashboard` vs `/admin_dashboard`)
- **Verify**: Middleware matcher patterns are correct
- **Debug**: Check redirect URLs in network tab

### Debug Commands:
```bash
# Check if middleware file exists
ls -la middleware.js

# Verify environment variables
cat .env.local | grep NEXTAUTH

# Test token generation
curl -X POST http://localhost:3000/api/auth/signin/credentials
```

## 📸 Screenshot Requirements

### For Submission, Capture:
1. **IDE View**: `middleware.js` file open showing the complete code
2. **Terminal Output**: Multiple log entries showing:
   - Unauthorized access attempts
   - Role-based access denials
   - Successful access grants
3. **Browser Network Tab**: Showing redirect responses (302 status codes)
4. **URL Bar**: Showing actual redirections happening

### Example Terminal Output to Capture:
```
🔒 Middleware: Checking access to /admin-dashboard
❌ Unauthorized access attempt to /admin-dashboard - No token found
   Redirecting to /signin
🔒 Middleware: Checking access to /student-dashboard
👤 User role: admin, accessing: /student-dashboard
❌ Access denied: admin user trying to access student dashboard
   Redirecting to /admin-dashboard
🔒 Middleware: Checking access to /admin-dashboard
👤 User role: admin, accessing: /admin-dashboard
✅ Admin access granted to admin dashboard
✅ Access granted to /admin-dashboard
```

## ✅ Success Criteria

Your middleware implementation is working correctly if:
- ✅ Unauthenticated users are redirected to signin
- ✅ Admin users can access admin dashboard only
- ✅ Student users can access student dashboard only
- ✅ Cross-role access attempts are blocked and redirected
- ✅ All access attempts are logged in terminal
- ✅ Redirects include appropriate callback URLs
- ✅ No infinite redirect loops occur

## 🔐 Security Benefits

### Enhanced Security Features:
1. **Server-Side Protection**: Middleware runs on server before page loads
2. **JWT Validation**: Secure token verification with secret
3. **Role Enforcement**: Strict role-based access control
4. **Audit Trail**: Complete logging of access attempts
5. **Automatic Redirects**: Seamless user experience with security

---

**Ready to test!** 🚀 Your middleware-based route protection is fully implemented and secure!