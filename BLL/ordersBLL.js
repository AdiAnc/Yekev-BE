const mongoose = require('mongoose');
const Order = require('../models/ordersModel.js')


const connectDB = require('../configs/db.js');

const getAllOrders = () => {
  connectDB()
 return Order.find();
};

// Get By ID
const getOrderById = (id) => {
  return Order.findById(id);
};



const addOrder = async (obj) => {
  // Ensure the object structure matches the schema
  const formattedObj = { ...obj };
  
  // Create a new order instance
  const order = new Order(formattedObj);
  
  // Save the order
  const savedOrder = await order.save();
  return savedOrder; // Return the saved order
};



// Put
// const updateOrder = async (id, obj) => {
//   await Order.findByIdAndUpdate(id, obj);
//   return 'Updated!';
// };

const deleteOrder = async (id) => {
  await Order.findByIdAndDelete(id);
  return 'Deleted!';
};


const updateOrder = async (orderId, productId, productStatus) => {
  try {
    // Ensure productStatus is valid
    if (!['in_process', 'close'].includes(productStatus)) {
      throw new Error('Invalid product status');
    }

    // Update the product's status atomically
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId, 'product.productId': productId }, // Correct path
      { $set: { 'product.$.status': productStatus } },
      { new: true }
    );
    

    if (!updatedOrder) {
      throw new Error('Order or Product not found');
    }

    return updatedOrder; // Return the updated order
  } catch (error) {
    throw error;
  }
};

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    // Validate the new status if necessary
    const validStatuses = ['new', 'in_process', 'close'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error('Invalid order status');
    }

    // Update the order's status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      throw new Error('Order not found');
    }

    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

const updateOrderFields = async (orderId, updatedFields) => {
  try {
    // Ensure the provided fields are not empty
    if (!updatedFields || Object.keys(updatedFields).length === 0) {
      throw new Error('No fields to update');
    }

    // Update the order with the provided fields
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: updatedFields },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      throw new Error('Order not found');
    }

    return updatedOrder;
  } catch (error) {
    throw error;
  }
};




module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  deleteOrder,
  updateOrder,
  updateOrderStatus,
  updateOrderFields
};

getAllOrders()