'user strict';

var express = require('express');
var connect =  require('../db/db.js');
var tool = require('../tool/tool.js');

module.exports = {
    addLeaveBill:function(){
        let user = req.session.user,
            params = req.body;
        let sql = 'insert into leave_bill values(?,?,?,?,?,?)';
        let values = [tool.uuid(),user.id,params.begin_date,params.end_date,params.content,
            Math.floor((new Date(params.end_date) - new Date(params.begin_date))/1000/60/60)];
        console.log(values);
        connect.query(sql,values,function(err,result){
            if(err){
                console.log(err);
                res.end(JSON.stringify({
                    resultCode:'-1',
                    message:'add failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode:'200',
                    body:{}
                }));
            }
        });
    },
    getMyLeaveList:function(){
        var user = req.session.user;
        var sql = 'select * from leave_bill where user_id = "'+user.user_id+'"';
        connect.query(sql,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode:'-1',
                    message:'query failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode:'200',
                    body:result
                }));
            }
        });
    },
    getLeaveStatistic:function(){
        let option = req.body;
        console.log(option);
        let sql = 'select user.number,user.name,sum(overtime_bill.time) as time from user LEFT JOIN leave_bill on user.id = leave_bill.user_id where 1=1';
        if(!tool.isEmpty(option.name)){
            sql += ' and user.name like "%'+option.name+'%"';
        }
        if(!tool.isEmpty(option.number)){
            sql += ' and user.number ='+option.number;
        }
        if(!tool.isEmpty(option.begin_date)){
            sql += ' and leave_bill.begin_date > "'+option.begin_date+'"';
        }
        if(!tool.isEmpty(option.end_date)){
            sql += ' and leave_bill.end_date < "'+option.end_date+'"';
        }
        sql += ' group by user.name';
        console.log('==============='+sql);
        connect.query(sql,function(err,result){
            if(err){
                console.log(err)
                res.end(JSON.stringify({
                    resultCode:'-1',
                    message:'query failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode:'200',
                    body:result
                }));
            }
        });
    }
}