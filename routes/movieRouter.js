const express = require('express');
const router = express.Router();
const { getMovieDesc} = require('../controllers/movieController');
const { isLogged} = require('../controllers/userController')




router.get('/details/:id', getMovieDesc)


module.exports = router;