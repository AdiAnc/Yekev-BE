const Menu = require('../models/menuModel'); // Assuming the schema file is named menuModel.js
const db = require('../configs/db.js'); // Database configuration and connection
const connectDB = require('../configs/db.js')

// Get All Menu Items
const getAllMenuItems = async () => {
  connectDB // Connect to the database
  try {
    let result = await Menu.find();
    console.log('Getting all menu items:', result);
    return result;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error; // Propagate the error
  }
};

// Get Menu Item by ID
const getMenuById = async (id) => {
  try {
    const menuItem = await Menu.findById(id);
    return menuItem;
  } catch (error) {
    console.error('Error fetching menu item by ID:', error);
    throw error;
  }
};

// Add New Menu Item
// const addMenuItem = async (obj) => {
//   try {
//     const menuItem = new Menu(obj);
//     const savedMenuItem = await menuItem.save();
//     return savedMenuItem; // Returns the full saved object, including _id
//   } catch (error) {
//     console.error('Error adding menu item:', error);
//     throw error;
//   }
// };

const addMenuItem = async (obj) => {
  try {
    if (Array.isArray(obj)) {
      return await Menu.insertMany(obj); // ✅ Supports arrays
    } else {
      const menuItem = new Menu(obj);
      return await menuItem.save();
    }
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw error;
  }
};


// Update Menu Item
const updateMenuItem = async (id, obj) => {
  try {
    await Menu.findByIdAndUpdate(id, obj);
    return 'Updated!';
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

// Delete Menu Item
const deleteMenuItem = async (id) => {
  try {
    await Menu.findByIdAndDelete(id);
    return 'Deleted!';
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};

// Exporting functions
module.exports = {
  getAllMenuItems,
  getMenuById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
};

// Optionally, call a function for testing purposes
getAllMenuItems();
