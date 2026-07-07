const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Item = require('./models/Item');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully 🚀'))
  .catch(err => console.error('MongoDB Connection Error: ', err));

// --- API ROUTES ---

// GET all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ expiryDate: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching stash items' });
  }
});

// POST a new item
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE an item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    await item.deleteOne();
    res.json({ success: true, message: 'Item removed from stash' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting item' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} 🔥`);
});