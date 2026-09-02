// Run with: npm run seed:admin
// Creates a single admin account. Safe to re-run - skips if one already exists.

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

const ADMIN_EMAIL = 'admin@jobportal.com';
const ADMIN_PASSWORD = 'admin123';

const seedAdmin = async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log('Admin account already exists - nothing to do.');
      process.exit(0);
    }

    await User.create({
      name: 'Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
    });

    console.log('Admin account created:');
    console.log(`  Email:    ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log('Log in with these, then consider changing the password.');

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin account:', error.message);
    process.exit(1);
  }
};

seedAdmin();
