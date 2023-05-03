require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 3000;


// Setup your Middleware and API Router here
app.use(express.json())
app.use(cors());

const router = require('./api');
app.use('/api', router);

// const { client } = require('./db');
// client.connect();

app.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
});


// app.listen(() => {
//     console.log('The server is up!');
// });

module.exports = app;
