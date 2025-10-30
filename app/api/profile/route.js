import connectDB from '../../../utils/mongodb';
import User from '../../models/User';

export async function GET(request) {
    try {
        await connectDB();

        // Get user ID from query parameters
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('id');

        if (!userId) {
            return Response.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        // Find user by ID
        const user = await User.findById(userId, { password: 0 }); // Exclude password
        
        if (!user) {
            return Response.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        console.log('👤 Profile requested for:', user.email);

        return Response.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        console.error('💥 Profile fetch error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        await connectDB();

        const body = await request.json();
        const { id, name, email } = body;

        if (!id) {
            return Response.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { 
                name: name?.trim(),
                email: email?.toLowerCase().trim()
            },
            { 
                new: true, 
                runValidators: true,
                select: { password: 0 } // Exclude password from response
            }
        );

        if (!updatedUser) {
            return Response.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        console.log('✅ Profile updated for:', updatedUser.email);

        return Response.json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
            }
        });

    } catch (error) {
        console.error('💥 Profile update error:', error);
        
        // Handle validation errors
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
                { error: 'Email already exists' },
                { status: 409 }
            );
        }

        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}