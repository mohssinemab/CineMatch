const express = require('express');
const router = express.Router();
const { addItem} = require('../controllers/itemController')



router.post('/addItem', addItem)


module.exports = router;