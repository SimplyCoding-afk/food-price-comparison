const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['FLAT', 'PERCENTAGE'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  maxDiscount: {
    type: Number,
    default: null
  }
}, { _id: false });

const platformSchema = new mongoose.Schema({
  basePrice: {
    type: Number,
    required: true
  },
  coupons: [couponSchema]
}, { _id: false });

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  swiggy: {
    type: platformSchema,
    required: true
  },
  zomato: {
    type: platformSchema,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);