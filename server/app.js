require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./configs/db.config');


const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const refreshRouter = require('./routes/refresh');
const logoutRouter = require('./routes/logout');
const newPlaylistRouter = require('./routes/newPlaylist');
const playlist = require('./routes/playlist');
const addSongVotingRouter = require('./routes/addSongVoting')





const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use('/', indexRouter(db));
app.use('/refresh', refreshRouter())
app.use('/login', loginRouter());
app.use('/logout', logoutRouter());
app.use('/newPlaylist', newPlaylistRouter(db));
app.use('/playlist', playlist(db));
app.use('/addSongVoting', addSongVotingRouter(db))




module.exports = app;
