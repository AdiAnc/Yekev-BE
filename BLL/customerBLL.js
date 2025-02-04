const Customer = require('../models/customerModel')
const db = require('../configs/db.js');
const connectDB = require('../configs/db.js')


const getAllCustomers = async () => {
  // db.connectcustomerDB();
  connectDB()

  try {
    let result = await Customer.find();
    console.log('Getting all customers:', result);
    return result;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error; // Throw or handle the error appropriately
  }
};


// Get By ID
const getCustomerById = (id) => {
  return Customer.findById(id);
};

// Post
const addCustomer = async (obj) => {
  const customer = new Customer(obj);
  const savedCustomer = await customer.save();
  return savedCustomer;  // Return the full customer object including _id
};

// Put
const updateCustomer = async (id, obj) => {
  await Customer.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

const deleteCustomer = async (id) => {
  await Customer.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
 getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};

getAllCustomers()