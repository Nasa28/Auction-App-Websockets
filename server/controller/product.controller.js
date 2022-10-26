const Product = require('../models/product.model');

const bidProduct = async (data) => {
  const { amount, last_bidder, id } = data;
  const current_time = new Date();
  try {
    const product = await Product.findByPk(id);
    if (product.expires_at) {
      const remaining_time =
        (current_time.getTime() - product.expires_at.getTime()) / 1000;
      if (remaining_time < 15) {
        product.count_down = 15;
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

module.exports = { bidProduct };
