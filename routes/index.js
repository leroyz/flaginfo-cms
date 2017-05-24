var express = require('express');
var router = express.Router();

var User = require('./users.js');
var Book = require('./book.js');
var Leave = require('./leave.js');
var Overtime = require('./overtime.js');

/*用户相关操作*/
router.post('/getUserInfo', User.getUserInfo);
router.post('/addUser', User.addUser);
router.post('/deleteUser', User.deleteUser);
router.post('/updateUser', User.updateUser);
router.post('/login', User.login);
router.post('/logout', User.logout);

/*调休管理*/
router.post('/addLeaveBill', Leave.addLeaveBill);




/*加班管理*/
router.post('/addOverTimeBill', Overtime.addOverTimeBill);




/*书籍管理*/
router.post('/getBookList', Book.getBookList);




module.exports = router;
