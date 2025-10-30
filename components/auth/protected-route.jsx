'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (status === 'authenticated' && session?.user) {
      // Check role if required
      if (requiredRole && session.user.role !== requiredRole) {
        // Redirect to appropriate dashboard based on user's role
        if (session.user.role === 'admin') {
          router.push('/admin-dashboard');
        } else {
          router.push('/student-dashboard');
        }
        return;
      }

      setIsLoading(false);
    }
  }, [session, status, router, requiredRole]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect to signin
  }

  return children;
}