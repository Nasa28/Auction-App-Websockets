const {
  ToadScheduler,
  SimpleIntervalJob,
  AsyncTask,
} = require('toad-scheduler');
const Product = require('./models/product.model');
const scheduler = new ToadScheduler();
const task1 = new AsyncTask(
  'simple task',
  async () => {
    const product = await Product.findOne({ where: { active: true } });
    if (!product || product.count_down === null) {
      return;
    }

    if (product.count_down) {
      product.count_down -= 1;
    }

    if (product.count_down === 0) {
      await product.update({ active: false, won: true });
    }
    return await product.save();
  },
  (err) => {
    console.log(err);
  },
);
const job1 = new SimpleIntervalJob({ seconds: 1, runImmediately: true }, task1);

scheduler.addSimpleIntervalJob(job1);
const task2 = new AsyncTask(
  'simple task',
  async () => {
    const item = await Product.findOne({ where: { won: true } });
    const product = await Product.findAll();
    if (product.length === 0) {
      await Product.create({
        name: 'Toyota Camry',
        description: 'This is an awesome ride',
        current_price: 1,
      });
    }
    if (item) {
      await item.destroy();
      await Product.create({
        name: 'Toyota Camry',
        description: 'This is an awesome ride',
        current_price: 1,
      });
    } else {
      return;
    }
  },
  (err) => {
    console.log(err);
  },
);
const job2 = new SimpleIntervalJob(
  { seconds: 55, runImmediately: true },
  task2,
);

scheduler.addSimpleIntervalJob(job2);
