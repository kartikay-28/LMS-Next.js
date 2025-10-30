import connectDB from '../utils/mongodb.js';
import User from '../app/models/User.js';
import bcrypt from 'bcryptjs';

async function seedUsers() {
    try {
        await connectDB();
        console.log('🌱 Seeding initial users...');

        // Check if users already exist
        const existingUsers = await User.countDocuments();
        if (existingUsers > 0) {
            console.log('✅ Users already exist, skipping seed');
            return;
        }

        // Hash passwords
        const adminPassword = await bcrypt.hash('password', 12);
        const studentPassword = await bcrypt.hash('password', 12);

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
            }
        ];

        await User.insertMany(users);
        console.log('✅ Initial users created successfully');
        console.log('   - admin@example.com (password: password)');
        console.log('   - student@example.com (password: password)');

    } catch (error) {
        console.error('❌ Error seeding users:', error);
    }
}

seedUsers();