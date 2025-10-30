import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  console.log(`🔒 Middleware: Checking access to ${pathname}`);

  // Check if user is authenticated
  if (!token) {
    console.log(`❌ Unauthorized access attempt to ${pathname} - No token found`);
    console.log('   Redirecting to /signin');

    // Redirect unauthenticated users to signin
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  const userRole = token.role;
  console.log(`👤 User role: ${userRole}, accessing: ${pathname}`);

  // Role-based access control
  if (pathname.startsWith('/admin-dashboard')) {
    if (userRole !== 'admin') {
      console.log(`❌ Access denied: ${userRole} user trying to access admin dashboard`);
      console.log('   Redirecting to /student-dashboard');

      // Redirect non-admin users to student dashboard
      return NextResponse.redirect(new URL('/student-dashboard', request.url));
    }
    console.log('✅ Admin access granted to admin dashboard');
  }

  if (pathname.startsWith('/student-dashboard')) {
    if (userRole !== 'student') {
      console.log(`❌ Access denied: ${userRole} user trying to access student dashboard`);
      console.log('   Redirecting to /admin-dashboard');

      // Redirect non-student users to admin dashboard
      return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    }
    console.log('✅ Student access granted to student dashboard');
  }

  // Allow access if all checks pass
  console.log(`✅ Access granted to ${pathname}`);
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/student-dashboard/:path*'
  ]
};