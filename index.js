const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

db.once('open', () => {
  console.log('Connected to MongoDB database');
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}!`);
  });
});