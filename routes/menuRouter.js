const express = require('express');
const menuBLL = require('../BLL/menuBLL'); // Assuming the BLL file is named menuBLL.js

const router = express.Router();

// GET All Menu Items
router.get('/', async (req, res) => {
  try {
    const menuItems = await menuBLL.getAllMenuItems();
    res.send(menuItems);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET Menu Item by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await menuBLL.getMenuById(id);
    res.send(menuItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST New Menu Item
router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await menuBLL.addMenuItem(obj);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT Update Menu Item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await menuBLL.updateMenuItem(id, obj);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE Menu Item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await menuBLL.deleteMenuItem(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
