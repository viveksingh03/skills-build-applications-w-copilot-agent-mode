import express from 'express';
import mongoose from 'mongoose';
import db from './config/database.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running' });
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connection established');
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
