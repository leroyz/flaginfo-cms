'user strict';
var express = require('express');
var router = express.Router();

var User = require('./users.js');
var Book = require('./book.js');
var Leave = require('./leave.js');
var Overtime = require('./overtime.js');

/*用户相关操作*/
router.post('/api/user/count', User.getCountUser);
router.post('/api/user/query', User.getUserList);
router.post('/api/user/getInfo', User.getUserInfo);
router.post('/api/user/add', User.addUser);
router.post('/api/user/delete', User.deleteUser);
router.post('/api/user/update', User.updateUser);
router.post('/api/user/login', User.login);
router.post('/api/user/logout', User.logout);

/*调休管理*/
router.post('/api/leave/addBill', Leave.addLeaveBill);
router.post('/api/leave/getMyList',Leave.getMyLeaveList);//我的调休记录
router.post('/api/leave/getMyStatistic',Leave.getMyLeaveStatistic);//我的调休统计




/*加班管理*/
router.post('/api/overTime/addBill', Overtime.addOverTimeBill);
router.post('/api/overTime/addMyList', Overtime.getMyOverTimeList);//我的加班记录
router.post('/api/overTime/addMyStatistic', Overtime.getMyOverTimeStatistic);//我的加班统计



/*书籍管理*/
router.post('/api/book/get', Book.getBookList);
router.post('/api/book/add',Book.addBook);
router.post('/api/book/delete',Book.deleteBook);
router.post('/api/book/update',Book.updateBook);



module.exports = router;
