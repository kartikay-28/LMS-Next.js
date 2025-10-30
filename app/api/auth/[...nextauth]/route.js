import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '../../../../utils/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('❌ NextAuth: Missing credentials');
            return null;
          }

          // Connect to MongoDB
          await connectDB();

          // Find user by email
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase().trim() 
          });

          if (!user) {
            console.log('❌ NextAuth: User not found:', credentials.email);
            return null;
          }

          // Verify password with bcrypt
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            console.log('❌ NextAuth: Invalid password for:', credentials.email);
            return null;
          }

          console.log('✅ NextAuth: User authenticated:', user.email);

          // Return user object (NextAuth will handle session)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
          };

        } catch (error) {
          console.error('💥 NextAuth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Include user role in JWT token
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Include user role and id in session
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
    error: '/signin'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };