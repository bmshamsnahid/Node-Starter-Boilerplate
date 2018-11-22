const express = require('express');

var app = express();
app.set('port', process.env.PORT || 8080);

app.set('view engine', 'ejs'); // setting a local view engine
app.use(express.static('public')); // defining a static directory

require('express-async-errors');

require('dotenv').config();
// console.log('DB_ADDRESS: ' + process.env.db);

/*
 * Be sure to setup your config values before running this code. You can
 * set them using environment variables or modifying the config file in /config.
 *
 */
require('./startup/checkAppConfiguration')(app); // enable cors
require('./startup/validation')();
require('./startup/route')(app);
require('./startup/db')();

// Start server
// Webhooks must be available via SSL with a certificate signed by a valid certificate authority.
app.listen(app.get('port'), function() {
    console.log('App is running on port ' + app.get('port'));
});

module.exports = app;
