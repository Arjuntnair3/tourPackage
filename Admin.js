import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  addedPackages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
  }],
});

export default mongoose.model('Admin', adminSchema);
