const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

// Create a new shop
router.post('/shops', async (req, res) => {
  try {
    const shop = new Shop(req.body);
    await shop.save();
    res.status(201).send(shop);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all shops
router.get('/shops', async (req, res) => {
  try {
    const shops = await Shop.find();
    res.send(shops);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get shop by ID
router.get('/shops/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).send();
    }
    res.send(shop);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update shop details
router.patch('/shops/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'shopImage',
    'shopName',
    'shopDescription',
    'shopCategory',
    'ownerName',
    'contacts',
    'address',
    'lat',
    'long',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!shop) {
      return res.status(404).send();
    }

    res.send(shop);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete shop
router.delete('/shops/:id', async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).send();
    }
    res.send(shop);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
