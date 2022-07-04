const express = require('express');
const fileUpload = require('express-fileupload')
const cors = require('cors');

const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares 
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/imgpost', require('./routes/imgpost'));
app.use('/api/imgprofile', require('./routes/imgprofile'));

module.exports = app;
