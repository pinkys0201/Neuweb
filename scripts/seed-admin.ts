
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable');
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
    image: { type: String },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@neuapex.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists');
        } else {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                name: 'Super Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            });
            console.log('Admin user created successfully');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();

export {};
