import connectDB from '../../../utils/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
    try {
        // Connect to MongoDB
        await connectDB();

        const body = await request.json();
        const { name, email, password, role } = body;

        console.log('📝 Registration attempt:', { name, email, role });

        // Validation: Check if all fields are filled
        if (!name || !email || !password || !role) {
            console.log('❌ Validation failed: Missing required fields');
            return Response.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validation: Check email format
        if (!emailRegex.test(email)) {
            console.log('❌ Validation failed: Invalid email format');
            return Response.json(
                { error: 'Please enter a valid email address' },
                { status: 400 }
            );
        }

        // Validation: Check password length
        if (password.length < 6) {
            console.log('❌ Validation failed: Password too short');
            return Response.json(
                { error: 'Password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        // Validation: Check role
        if (role !== 'student' && role !== 'admin') {
            console.log('❌ Validation failed: Invalid role');
            return Response.json(
                { error: 'Role must be either student or admin' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            console.log('❌ Registration failed: User already exists');
            return Response.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user in MongoDB
        const newUser = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role
        });

        // Log successful registration to terminal
        console.log('✅ User registered successfully:');
        console.log('   ID:', newUser._id);
        console.log('   Name:', newUser.name);
        console.log('   Email:', newUser.email);
        console.log('   Role:', newUser.role);
        console.log('   Created:', newUser.createdAt);
        console.log('---');

        // Return success response (don't send password back)
        const dashboard = role === 'admin' ? 'admin-dashboard' : 'student-dashboard';
        const redirectMessage = `User registered successfully. Redirecting to /${dashboard}`;

        const userResponse = {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt
        };

        return Response.json(
            {
                message: redirectMessage,
                user: userResponse
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('💥 Registration error:', error);

        // Handle MongoDB validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return Response.json(
                { error: validationErrors.join(', ') },
                { status: 400 }
            );
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return Response.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Optional: GET endpoint to view all users (for debugging)
export async function GET() {
    try {
        await connectDB();
        const users = await User.find({}, { password: 0 }); // Exclude password field
        console.log('📋 Current users in system:', users.length);
        return Response.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}