const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campusos';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create Admin User
    let admin = await User.findOne({ email: 'admin@gmail.com' });
    if (!admin) {
      admin = new User({
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: 'admin@1234',
        role: 'admin',
        department: 'Administration',
        semester: 1
      });
      await admin.save();
      console.log('Created admin user: admin@gmail.com / admin@1234');
    } else {
      admin.password = 'admin@1234';
      await admin.save();
      console.log('Updated admin user password');
    }

    // Create Student User
    let student = await User.findOne({ email: 'student@campusos.com' });
    if (!student) {
      student = new User({
        name: 'Student User',
        email: 'student@campusos.com',
        password: 'password',
        role: 'student',
        department: 'Computer Science',
        semester: 5
      });
      await student.save();
      console.log('Created student user: student@campusos.com / password');
    } else {
      student.password = 'password';
      await student.save();
      console.log('Updated student user password');
    }

    console.log('Done.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
