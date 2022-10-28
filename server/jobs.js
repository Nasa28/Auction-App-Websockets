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
    const current_time = new Date();

    const product = await Product.findOne({ where: { active: true } });
    if (!product || product.count_down === null) {
      return;
    }

    if (product.expires_at) {
      const remaining_time = Math.floor(
        (product.expires_at.getTime() - current_time.getTime()) / 1000,
      );
      if (remaining_time === 15) {
        product.count_down = remaining_time;
        await product.save();
      }
      if (remaining_time < 15) {
        product.count_down -= 1;
        await product.save();
      }
    }

    if (product.count_down === 0) {
      await product.update({ active: false });
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
    const product = await Product.findOne({ where: { active: false } });
    if (!product) {
      return;
    }
    await product.destroy();
  },
  (err) => {
    console.log(err);
  },
);
const job2 = new SimpleIntervalJob(
  { seconds: 90, runImmediately: true },
  task2,
);

scheduler.addSimpleIntervalJob(job2);

