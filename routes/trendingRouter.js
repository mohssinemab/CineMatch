const express = require('express');
const router = express.Router();
const { getTrending} = require('../controllers/trendingController')



router.get('/getTrending', getTrending)


module.exports = router;