require('dotenv').config();
const sequelize = require('./db/database');
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const PORT = 5000;

require('./jobs');
const Product = require('./models/product.model');
const { startBid } = require('./startBid');
const { bidProduct, addProduct } = require('./controller/product.controller');
const socketIO = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(cors());

socketIO.on('connection', async (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  socket.on('bidProduct', async (data) => {
    await Promise.all([bidProduct(data), startBid(data.id)]);
    const product = await Product.findByPk(data.id);
    const count = product.count_down;
    socket.broadcast.emit('bidProductResponse', data);
    socket.emit('counter', count);
  });
});

app.get('/api', async (req, res) => {
  const products = await Product.findAll({ where: { active: true } });
  res.status(200).json({ products });
});

sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

