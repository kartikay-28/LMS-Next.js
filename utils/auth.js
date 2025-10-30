// Simple session management utility
export const AUTH_STORAGE_KEY = 'lms_user_session';

export const saveUserSession = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      loginTime: new Date().toISOString()
    }));
  }
};

export const getUserSession = () => {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  }
  return null;
};

export const clearUserSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

export const isAuthenticated = () => {
  return getUserSession() !== null;
};

export const requireAuth = (router) => {
  const user = getUserSession();
  if (!user) {
    router.push('/signin');
    return null;
  }
  return user;
};