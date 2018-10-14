const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//CORS MIDDLEWARE
app.use(cors())



require('./config/passport')(passport);
require('./routes/user')(app,passport);
require('./config/mongo')(app,PORT);