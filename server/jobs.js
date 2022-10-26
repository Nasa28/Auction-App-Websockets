const express = require('express');
const app = express();
const server = require('http').Server(app);

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

    if (product.count_down > 0) {
      product.count_down -= 1;
      await product.save();
    } else if (product.count_down === 0) {
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
    const product = await Product.findOne({ where: { active: true } });
    if (!product) {
      const data = {
        name: 'Toyota camry',
        description: 'Super sleek',
        owner: 'Admin',
        current_price: 10,
      };
      await Product.create(data);
    }
  },
  (err) => {
    console.log(err);
  },
);
const job2 = new SimpleIntervalJob({ minutes: 1, runImmediately: true }, task2);

scheduler.addSimpleIntervalJob(job2);

// scheduler.stop();
