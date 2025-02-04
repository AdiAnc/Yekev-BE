const mongoose = require('mongoose');


// Define the schema for customers
const customerSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    orderId: String,
  },
  { versionKey: false }
);

// Create the Customer model
const Customer = mongoose.model('Customer', customerSchema, 'customers');


// Export the Customer model
module.exports = Customer;
