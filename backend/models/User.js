import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImgUrl: { type: String,default:null },
  role: { type: String, enum: ['admin', 'user','member'], default: 'member' },
}, { timestamps: true });
export default mongoose.model('User', userSchema);
