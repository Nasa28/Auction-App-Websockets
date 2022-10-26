const Product = require('./models/product.model');

const startBid = async (id) => {
  const product = await Product.findByPk(id);
  const current_time = new Date();
  if (product.expires_at === null) {
    product.expires_at = current_time.getTime() + 60000;
    product.count_down = 60;
  }
  await product.save();
};

module.exports = { startBid };
