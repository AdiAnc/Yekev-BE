const express = require('express');
const customerBLL = require('../BLL/customerBLL');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customer = await customerBLL.getAllCustomers();
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await customerBLL.getCustomerById(id);
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await customerBLL.addCustomer(obj);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await customerBLL.updateCustomer(id, obj);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await customerBLL.deleteCustomer(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;