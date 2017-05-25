'user strict';
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
router.post('/getMyLeaveList',Leave.getMyLeaveList);//我的调休记录
router.post('/getMyLeaveStatistic',Leave.getMyLeaveStatistic);//我的调休统计




/*加班管理*/
router.post('/addOverTimeBill', Overtime.addOverTimeBill);
router.post('/addMyOverTimeList', Overtime.getMyOverTimeList);//我的加班记录
router.post('/addMyOverTimeStatistic', Overtime.getMyOverTimeStatistic);//我的加班统计



/*书籍管理*/
router.post('/getBookList', Book.getBookList);
router.post('/addBook',Book.addBook);
router.post('/deleteBook',Book.deleteBook);
router.post('/updateBook',Book.updateBook);



module.exports = router;
