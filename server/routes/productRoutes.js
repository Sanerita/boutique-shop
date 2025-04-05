import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Routes implementation...
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;