const express = require('express');
const path  = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', function(){
	console.log('Connected to database ' + config.database);
});

// On Connection Error
mongoose.connection.on('error', function(err){
	console.log('Error in connection: '+ err);
});

const app = express();

const users = require('./routes/users');

//Port number
const port = 3000;

//CORS Middleware
app.use(cors());

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Body-parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get('/', function(req, res){
	res.send('Nothing to see here!');
});

//Start server
app.listen(port, function(){
	console.log('Server is started at port '+port);
});