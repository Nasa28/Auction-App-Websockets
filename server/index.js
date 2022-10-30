require('dotenv').config();
const sequelize = require('./db/database');
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const port = process.env.PORT || 5000;

require('./jobs');
const Product = require('./models/product.model');
const { startBid } = require('./startBid');
const { bidItem } = require('./controller/product.controller');
app.use(cors());
const socketIO = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

socketIO.on('connection', async (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  socket.on('bidItem', async (data) => {
    await Promise.all([bidItem(data), startBid(data.id)]);
    const product = await Product.findByPk(data.id);
    socket.broadcast.emit('bidItemResponse', data);
  });

  socket.on('new-user', (data) => {
    socket.broadcast.emit('joinUserResponse', data);
  });

  setInterval(function () {
    Product.findAll().then((item) => {
      if (item.length === 0) {
        return;
      }
      if (item[0].count_down) {
        const count = item[0].count_down;
        socket.emit('counter', count);
      }

      if (item[0].won) {
        socket.emit(
          'winner',
          `${item[0].last_bidder} won the last Auction @${item[0].current_price}`,
        );
      }
      socket.broadcast.emit('all-items', item);
    });
  }, 1000);
});
sequelize
  .sync()
  .then(() => {
    server.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on ${port}`);
    });
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
