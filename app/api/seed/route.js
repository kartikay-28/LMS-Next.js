import connectDB from '../../../utils/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export async function POST() {
    try {
        await connectDB();
        
        console.log('🌱 Seeding database with initial users...');

        // Check if users already exist
        const existingUsers = await User.countDocuments();
        if (existingUsers > 0) {
            console.log('✅ Users already exist, skipping seed');
            return Response.json({ 
                message: 'Database already seeded',
                userCount: existingUsers 
            });
        }

        // Hash passwords
        const saltRounds = 12;
        const adminPassword = await bcrypt.hash('password', saltRounds);
        const studentPassword = await bcrypt.hash('password', saltRounds);

        // Create initial users
        const users = [
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: adminPassword,
                role: 'admin'
            },
            {
                name: 'Student User',
                email: 'student@example.com',
                password: studentPassword,
                role: 'student'
            },
            {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: await bcrypt.hash('password123', saltRounds),
                role: 'student'
            },
            {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                password: await bcrypt.hash('password123', saltRounds),
                role: 'student'
            }
        ];

        const createdUsers = await User.insertMany(users);
        
        console.log('✅ Database seeded successfully:');
        createdUsers.forEach(user => {
            console.log(`   - ${user.email} (${user.role})`);
        });

        return Response.json({ 
            message: 'Database seeded successfully',
            users: createdUsers.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }))
        });

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        return Response.json(
            { error: 'Failed to seed database' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return Response.json({ 
        message: 'Use POST method to seed the database with initial users' 
    });
}