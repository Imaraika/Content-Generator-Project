import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
},
  username: {
    type: String,
    required: true
  },
  password: {
      type: String,
      required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true
},
  createdAt: {
      type: Date,
      default: Date.now(),
  }
});


const User = mongoose.model('User', UserSchema);
export default User;