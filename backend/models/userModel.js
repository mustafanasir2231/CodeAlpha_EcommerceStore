import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Password hashing ke liye import kiya

// User Schema design kar rahe hain
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true, // Ek email se do accounts nahi ban sakte
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'], // Sirf 'user' ya 'admin' hi ho sakta hai
            default: 'user', // Naya register hone wala default user hoga
        },
    },
    {
        timestamps: true, // Yeh khud-ba-khud 'createdAt' aur 'updatedAt' ki date save karega
    }
);

// 🔒 METHOD: Login ke waqt password verify karne ke liye
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 🛡️ PRE-SAVE HOOK: Database mein save hone se pehle password ko hash karne ke liye
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;