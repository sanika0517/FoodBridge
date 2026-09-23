const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {

  donorId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
    foodName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    foodType: {
      type: String,
      enum: ["Vegetarian", "Non-Vegetarian", "Vegan", "Other"],
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    pickupStart: {
      type: Date,
      required: true,
    },

    pickupEnd: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Claimed", "Expired"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Food", foodSchema);