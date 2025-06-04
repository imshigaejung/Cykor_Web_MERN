require('dotenv').config();
const express = require("express");
const axios = require("axios");
const app= express();
const cors = require('cors');
const connectDB = require('./db');
const routes = require('./routes');
const session =require('express-session');
const verify = require('./services/service_verify');

//parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//connection - cors setting
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//db connection
connectDB();

//session setting
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

//routing
app.use('/api',routes);
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({error: err.message});
});
//root dir process
app.get('/', (req, res) => {
  res.send('Main Page');
});

app.listen(5001, ()=>{
  console.log("Server listening...");
}) 

