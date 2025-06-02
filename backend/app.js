require('dotenv').config();
const express = require("express");
const axios = require("axios");
const app= express();
const connectDB = require('./db');
const routes = require('./routes');
const session =require('express-session');
const verify = require('./services/service_verify');

//parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//db connection
connectDB();

//session activation
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

//routing
app.use('/api',routes);

//root dir process
app.get('/', (req, res) => {
  res.send('Main Page');
});

app.listen(5001, ()=>{
  console.log("Server listening...");
}) 