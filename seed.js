const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const productsData = require('./data/products.json');
const usersData = require('./data/users.json');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert products
    const products = await Product.insertMany(productsData);
    console.log(`Inserted ${products.length} products`);

    // Insert users
    const users = await User.insertMany(usersData);
    console.log(`Inserted ${users.length} users`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
});