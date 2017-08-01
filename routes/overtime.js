'user strict';

var express = require('express');
var connect =  require('../db/db.js');
var tool = require('../tool/tool.js');

module.exports = {
    /**
     * 申请加班
     * @param req
     * @param res
     * @param next
     */
    addOverTimeBill:function(req,res,next){
        let user = req.session.user,
            params = req.body;
        let sql = 'insert into overtime_bill values(?,?,?,?,?,?)';
        let values = [tool.uuid(),params.begin_date,params.end_date,params.reason,
                    req.params.reason,tool.timeSlot(params.begin_date,params.end_date),user.user_id];
        connect.query(sql,values,function(err,result){
            if(err){
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
    /**
     * 我的加班记录
     * @param req
     * @param res
     * @param next
     */
    getMyOverTimeList:function(req,res,next){
        var user = req.session.user;
        var sql = 'select * from overtime_bill where user_id = "'+user.user_id+'"';
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
    /**
     * 加班统计
     * @param req
     * @param res
     * @param next
     * 统计方式包含两种{
     *  1、按时间段统计，即包含开始时间和结束时间
     *  2、按月份统计，即按照指定的月份统计
     * }
     * 统计结果包含{
     *  开始时间
     *  结束时间
     *  加班总时长
     *
     * }
     */
    getOverTimeStatistic:function(req,res,next){
        let option = req.query;
        let sql = 'select user.name,sum(overtime_bill.time) as time from user LEFT JOIN overtime_bill on user.id = overtime_bill.user_id where 1=1';
        if(!tool.isEmpty(option.name)){
            sql += ' and user.name like "%'+option.name+'%"';
        }
        if(!tool.isEmpty(option.number)){
            sql += ' and user.number ='+option.number;
        }
        if(!tool.isEmpty(option.begin_date)){
            sql += ' and overtime_bill.begin_date > '+option.begin_date;
        }
        if(!tool.isEmpty(option.end_date)){
            sql += ' and overtime_bill.end_date > '+option.end_date;
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