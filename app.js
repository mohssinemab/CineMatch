var express = require('express');
var app = express();
var mongoose = require('mongoose');


app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies


app.get('/', function (req, res) {
  res.send('-- Hello World!');
});

//Le fichier .env pour le stockage des url,logins,ports...
require('dotenv').config();


//Database Connection
mongoose.connect(process.env.DATABASE)
  .then(() => console.log('Mongo : Connecté avec succès'))
  .catch(() => console.log('Mongo : Echec de connexion à la base de données'))


const itemRoutes = require('./routes/itemRouter');

app.use('/', itemRoutes);

app.listen(3000, function () {
  console.log('*** CineMatch app listening on port 3000');
});