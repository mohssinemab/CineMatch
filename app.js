var express = require('express');
var app = express();
var mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.send('-- Hello World!');
});

require('dotenv').config();


//Database Connection
mongoose.connect(process.env.DATABASE)
  .then(() => console.log('Mongo : Connecté avec succès'))
  .catch(() => console.log('Mongo : Echec de connexion à la base de données'))


const userRoutes = require('./routes/userRouter');
const movieRoutes = require('./routes/movieRouter');
const trendRoutes = require('./routes/trendingRouter');


app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/trend', trendRoutes);


app.listen(3000, function () {
  console.log('*** CineMatch app listening on port 3000');
});