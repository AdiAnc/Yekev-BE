const express = require('express');
const ordersBLL = require('../BLL/ordersBLL');
const mongoose = require('mongoose');
const Order = require('../models/ordersModel'); // Adjust the path if needed


const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const order = await ordersBLL.getAllOrders();
//     res.send(order);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.get('/', async (req, res) => {
  try {
    let { status } = req.query;

    // If status is an array or a string, normalize it to an array
    if (typeof status === 'string') {
      status = status.split(',');
    }

    // Create a filter for the query
    const filter = status ? { status: { $in: status } } : {};

    const orders = await Order.find(filter);
    res.send(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send(error.message);
  }
});



router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await ordersBLL.getOrderById(id);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    console.log("Received Object:", JSON.stringify(obj, null, 2)); // Pretty-print JSON
    const result = await ordersBLL.addOrder(obj);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error in POST /:", error);
    res.status(500).send(error);
  }
});

//06-01 
// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const obj = req.body;
//     const result = await ordersBLL.updateOrder(id, obj);
//     res.send(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }

// });


router.put('/:orderId/product/:productId', async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const { productStatus } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send('Invalid orderId or productId');
    }

    // Update the product status
    const updatedOrder = await ordersBLL.updateOrder(orderId, productId, productStatus);

    // Respond with the updated order
    res.status(200).send({
      message: 'Product status updated successfully!',
      updatedOrder,
    });
  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).send(error.message);
  }
});


    // Call the BLL function to update the product's status


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ordersBLL.deleteOrder(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.put('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedFields = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).send('Invalid orderId');
    }

    // Call the BLL function to update the order's fields
    const updatedOrder = await ordersBLL.updateOrderFields(orderId, updatedFields);

    // Respond with the updated order
    res.status(200).send({
      message: 'Order updated successfully!',
      updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).send(error.message);
  }
});

router.get('/test', (req, res) => {
  res.send({ message: 'API is working' });
});


module.exports = router;