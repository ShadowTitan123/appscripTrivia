'use strict';

//Imports 
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const PORT = process.env.PORT; 



// Define All Required Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser('session_cookie_secret')); 
// app.use(session({
//   secret: "session_secret",
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000
//   },
// }))
app.use(express.static(path.join(__dirname, '/public')))




//@ API ROUTES 

//[GET]
app.get('/GetSingleUserInformation/:username',require('./controllers/UserController.js'));
app.get('/GetAllUserInformation',require('./controllers/UserController.js'));


// Summary 
app.get('/GetSummaryByUserID/:id',require('./controllers/AnswersController.js'));
//History 
app.get('/GetAllAnswers',require('./controllers/AnswersController.js'));


//[POST]
app.post('/AddUser',require('./controllers/UserController.js'));
app.post('/AddAnswer',require('./controllers/AnswersController.js'));



// Listen to Port 
app.listen(PORT, () => {
    console.log(`Trivia App Running on Port ${PORT}`);
})