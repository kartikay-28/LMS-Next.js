import connectDB from '../../../utils/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        // Connect to MongoDB
        await connectDB();

        const body = await request.json();
        const { email, password } = body;

        console.log('🔐 Sign in attempt:', { email });

        // Validation: Check if all fields are filled
        if (!email || !password) {
            console.log('❌ Sign in failed: Missing credentials');
            return Response.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            console.log('❌ Sign in failed: User not found');
            return Response.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('❌ Sign in failed: Invalid password');
            return Response.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Log successful sign in
        console.log('✅ User signed in successfully:');
        console.log('   ID:', user._id);
        console.log('   Name:', user.name);
        console.log('   Email:', user.email);
        console.log('   Role:', user.role);
        console.log('---');

        // Return success response (don't send password back)
        const userResponse = {
            id: user._id.toString(), // Convert ObjectId to string
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return Response.json(
            {
                message: 'Sign in successful',
                user: userResponse
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('💥 Sign in error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}