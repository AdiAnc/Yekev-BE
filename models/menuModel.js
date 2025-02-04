const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true // Removes whitespace around the name
      },
      price: {
        type: Number,
        required: true,
        min: 0 // Ensures price cannot be negative
      },
      handled_by: {
        type: String,
        enum: ["kitchen", "bar"], // Restricts to "kitchen" or "bar"
        required: true // Ensures handled_by is provided
      }
    },
    { versionKey: false }
  );
  
  module.exports = mongoose.model("Menu", menuSchema, 'menu');

  