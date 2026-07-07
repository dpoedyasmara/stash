const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a food item name'],
    trim: true
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please add an expiration date']
  },
  location: {
    type: String,
    default: 'Fridge'
  },
  isShared: {
    type: Boolean,
    default: false
  },
  ownerId: {
    type: String,
    default: 'dummy_user_1'
  },
  householdId: {
    type: String,
    default: 'dummy_house_1'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', ItemSchema);