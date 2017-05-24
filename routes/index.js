var express = require('express');
var router = express.Router();

var User = require('./users.js')


router.get('/getUserInfo', User.getUserInfo);
router.post('/addUser', User.addUser);
router.post('/deleteUser', User.deleteUser);
router.post('/updateUser', User.updateUser);
router.post('/login', User.login);
router.post('/logout', User.logout);



module.exports = router;
