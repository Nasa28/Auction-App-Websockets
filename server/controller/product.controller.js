const Product = require('../models/product.model');

const bidItem = async (data) => {
  const { amount, last_bidder, id } = data;
  const current_time = new Date();
  try {
    const product = await Product.findByPk(id);
    if (product.expires_at) {
      const remaining_time = Math.floor(
        (product.expires_at.getTime() - current_time.getTime()) / 1000,
      );
      if (remaining_time < 15) {
        product.count_down = 15;
        await product.save();
      }
    }

    const updateBid = {
      last_bidder: last_bidder,
      current_price: amount,
    };
    await product.update(updateBid);
    await product.save();
  } catch (err) {
    console.log(err);
  }
  
};

const addItem = async (data) => {
  const product = await Product.findOne({ where: { active: true } });

  if (product) {
    return 'Cannot create a product at this moment';
  }
  await Product.create(data);
};

module.exports = { bidItem, addItem };
