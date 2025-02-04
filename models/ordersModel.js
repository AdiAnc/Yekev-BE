const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Menu' }, // Reference to the Menu collection
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      note: { type: String },
      orderType: { type: String, required: true, enum: ['kitchen', 'bar'] }, // Either 'kitchen' or 'bar'
      status: { type: String, required: true, enum: ['new', 'in_process', 'completed'], default: 'new' }, // Status of the product
    },
    { _id: false } // Prevents MongoDB from generating unique IDs for each product sub-document
  );
  
  const orderSchema = new mongoose.Schema(
    {
      product: { type: [productSchema], required: true }, // Array of products
      status: { 
        type: String, 
        enum: ['new', 'unprocessed', 'close'], 
        default: 'new' 
      }, // Status of the order
      customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' }, // Reference to Customer collection
      createdAt: { type: Date, default: Date.now }, // Add the current date and time
    },
    { versionKey: false }
  );
  
  // Create the Order model
  const Order = mongoose.model('Order', orderSchema, 'orders');
  
  // Export the Order model
  module.exports = Order;
  

// const productSchema = new mongoose.Schema(
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Menu' }, // Reference to the Menu collection
//       productName: { type: String, required: true },
//       quantity: { type: Number, required: true },
//       note: { type: String },
//       orderType: { type: String, required: true, enum: ['kitchen', 'bar'] }, // Either 'kitchen' or 'bar'
//       status: { type: String, required: true, enum: ['new', 'in_process', 'completed'], default: 'new' }, // Status of the product
//     },
//     { _id: false } // Prevents MongoDB from generating unique IDs for each product sub-document
//   );
  
//   const orderSchema = new mongoose.Schema(
//     {
//       product: { type: [productSchema], required: true }, // Array of products
//       status: { 
//         type: String, 
//         enum: ['new', 'unprocessed', 'close'], 
//         default: 'new' 
//       }, // Status of the order
//       customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' }, // Reference to Customer collection
//     },
//     { versionKey: false }
//   );
  
  
// // Create the Order model
// const Order = mongoose.model('Order', orderSchema, 'orders');

// // Export the Order model
// module.exports = Order;

