require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const PORT = 3000;

// Serve static files from the React app
app.use(express.static('public'));

// Setup your Middleware and API Router here
app.use(express.json());
app.use(cors());

const router = require('./src/api');
app.use('/api', router);

app.get('/', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  next();
});

module.exports = app;
