require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const spotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');
const cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

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
app.use('/users', usersRouter);
app.use('/login', loginRouter());

app.listen(3001, () => {
  console.log('listening on 3001')
})




// app.post('/refresh', (req, res) => {
//   const refreshToken = req.body.refreshToken
//   const spotifyApi = new spotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken,
//   })


//   spotifyApi
//     .refreshAccessToken()
//     .then(data => {
//       console.log(data.body)
//       res.json({
//         accessToken: data.body.access_token,
//         expiresIn: data.body.expires_in,
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.sendStatus(400)
//     })
// })

module.exports = app;
