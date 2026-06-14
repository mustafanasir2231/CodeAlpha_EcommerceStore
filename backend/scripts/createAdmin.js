import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/userModel.js';

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected...');

    const exists = await User.findOne({ email: 'admin@codealpha.com' });
    if (exists) {
      console.log('✅ Admin already exists!');
      process.exit();
    }

const hashed = await bcrypt.hash('onlyadminlogin321', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@codealpha.com',
      password: hashed,
      role: 'admin',
    });

    console.log('✅ Admin created successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

createAdmin();