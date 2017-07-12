'user strict';
var express = require('express');
var router = express.Router();

var User = require('./users.js');
var Book = require('./book.js');
var Leave = require('./leave.js');
var Overtime = require('./overtime.js');

/*用户相关操作*/
router.post('/user/getInfo', User.getUserInfo);
router.post('/user/add', User.addUser);
router.post('/user/delete', User.deleteUser);
router.post('/user/update', User.updateUser);
router.post('/user/login', User.login);
router.post('/user/logout', User.logout);

/*调休管理*/
router.post('/leave/addBill', Leave.addLeaveBill);
router.post('/leave/getMyList',Leave.getMyLeaveList);//我的调休记录
router.post('/leave/getMyStatistic',Leave.getMyLeaveStatistic);//我的调休统计




/*加班管理*/
router.post('/overTime/addBill', Overtime.addOverTimeBill);
router.post('/overTime/addMyList', Overtime.getMyOverTimeList);//我的加班记录
router.post('/overTime/addMyStatistic', Overtime.getMyOverTimeStatistic);//我的加班统计



/*书籍管理*/
router.post('/book/get', Book.getBookList);
router.post('/book/add',Book.addBook);
router.post('/book/delete',Book.deleteBook);
router.post('/book/update',Book.updateBook);



module.exports = router;
