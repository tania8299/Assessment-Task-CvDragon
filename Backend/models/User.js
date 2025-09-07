const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    unique: true,
    // REMOVE required: true - it will be auto-generated
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  designation: {
    type: [String],
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    required: true,
    enum: ['Administrator', 'Manager', 'Employee', 'Viewer', 'Editor']
  },
  features: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true
});

// Generate user ID before saving - FIXED VERSION
userSchema.pre('save', async function(next) {
  // Only generate userId if it's a new document and userId doesn't exist
  if (this.isNew && !this.userId) {
    try {
      const lastUser = await mongoose.model('User')
        .findOne()
        .sort({ createdAt: -1 });
      
      let nextId = 1;
      if (lastUser && lastUser.userId) {
        // Extract number from existing userId (e.g., "USER0001" -> 1)
        const idMatch = lastUser.userId.match(/\d+$/);
        if (idMatch) {
          nextId = parseInt(idMatch[0]) + 1;
        }
      }
      
      this.userId = `USER${String(nextId).padStart(4, '0')}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);