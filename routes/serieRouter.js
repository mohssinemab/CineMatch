const express = require('express');
const router = express.Router();
// const { addItem} = require('../controllers/itemController')



router.post('/series/addItem', addItem)


module.exports = router;