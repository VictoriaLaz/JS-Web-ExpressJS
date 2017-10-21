
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
require('./config/database')(config);
const express = require('express');
const app = express();
require('./config/express')(app); 
require('./config/routes')(app);
require('./config/passport')();
app.listen(config.port);

