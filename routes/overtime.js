'user strict';

var express = require('express');
var connect =  require('../db/db.js');
var tool = require('../tool/tool.js');

module.exports = {
    addOverTimeBill:function(req,res,next){
        var user = req.session.user;
        var values = [tool.uuid(),req.params.begin_date,req.params.end_date,req.params.reason,
            req.params.reason,tool.timeSlot(req.params.begin_date,req.params.end_date),user.user_id];
        var sql = 'insert into overtime_bill values(?,?,?,?,?,?)';
        connect.query(sql,values,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode:'-1',
                    message:'add failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode:'200',
                    message:'add success'
                }));
            }
        });
    },
    /**
     * 我的加班记录
     * @param req
     * @param res
     * @param next
     */
    getMyOverTimeList:function(req,res,next){
        var user = req.session.user;
        var sql = 'select * from overtime_bill where user_id='+user.user_id;
        connect.query(sql,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode:'-1',
                    message:'query failed'
                }));
            }else{
                res.end(JSON.stringify(result));
            }
        });
    },
    /**
     * 我的加班统计
     * @param req
     * @param res
     * @param next
     */
    getMyOverTimeStatistic:function(req,res,next){

    }
}