require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const spotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');
const cors = require('cors');


const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const refreshRouter = require('./routes/refresh');
const logoutRouter = require('./routes/logout');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use('/', indexRouter);
app.use('/refresh', refreshRouter())
app.use('/login', loginRouter());
app.use('/logout', logoutRouter());


app.listen(3001, () => {
  console.log('listening on 3001')
})


module.exports = app;
