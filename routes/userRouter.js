const express = require('express');
const router = express.Router();
const {registerUser, loginUser, addToWishList, removeFromWishList, getWishList, verifyToken, getSuggestions} = require('../controllers/userController')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/addToWishList', addToWishList)
router.post('/removeFromWishList', removeFromWishList)
router.post('/getWishList', getWishList)
router.get('/verify-token', verifyToken);
router.get('/getSuggestions/:username',getSuggestions );


module.exports = router;