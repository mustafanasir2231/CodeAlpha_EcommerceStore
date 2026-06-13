import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const updateUserProfile = asyncHandler(async (req, res) => {
  // 1. User find karein
  const user = await User.findById(req.user._id);

  if (user) {
    // 2. Name aur Email update karein
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // 3. Password check (sirf tab jab newPassword bheja gaya ho)
    if (req.body.newPassword && req.body.newPassword !== "") {
      
      // Current password check lazmi hai
      if (!req.body.currentPassword) {
        res.status(400);
        throw new Error('Please enter your current password');
      }

      const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
      
      if (!isMatch) {
        res.status(401);
        throw new Error('Invalid current password');
      }

      // Naya password hash karein
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.newPassword, salt);
    }

    const updatedUser = await user.save();

    // 4. Client ko updated data bhejein
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      // Token zaroori hai agar frontend localStorage refresh kar raha hai
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { updateUserProfile };