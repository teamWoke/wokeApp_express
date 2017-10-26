// require packages and set up variables
const express = require('express'),
      logger = require('morgan'),
      app = express(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 8080,
      Auth = require('./services/auth'),
      cors = require('cors'),
      pgp = require('pg-promise')(),
      axios = require('axios'),
      dotenv = require('dotenv'),
      cookieParser = require('cookie-parser'),
      session = require('express-session');


// use cors so we can talk to our other server
app.use(cors());

// body parser to get form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// logger to see whats going on
app.use(logger('dev'));

// before all routes, use the middleware we define in Auth to get the
// current user
app.use(Auth.authenticate);

// set up base routes
app.use('/users', require('./controllers/users'));
app.use('/login', require('./controllers/sessions'));
app.use('/news', require('./controllers/news'));

// listen on port and run server
app.listen(port, () => console.log('server listening on ' + port));