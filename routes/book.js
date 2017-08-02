'use strict';
var express = require('express');
var connect =  require('../db/db.js');
var tool = require('../tool/tool.js');

module.exports = {
    getBookList:function(req,res,next){
        var option = req.body;
        let sql = 'select book.number,book.name,book.status,user.name username from book left join user on book.user_id=user.id where 1=1';
        if(option.number){
            sql += ' and number="'+option.number+'"';
        }
        if(option.name){
            sql += ' and name="'+option.name+'"';
        }
        sql += ' limit '+(option.pageNo-1)*option.pageSize+','+option.pageNo*option.pageSize;
        connect.query(sql,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'query failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode : '200',
                    body:result
                }));
            }
        });
    },
    addBook:function(req,res,next){
        var book = req.body;
        connect.query('select id from book where number="'+book.number+'"',function(err,result){
            if(result){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'该编号已经存在'
                }));
                return;
            }
        });
        let sql = 'inset into book values(?,?,,?,?)';
        var params = [tool.uuid(),book.name,book.number,new Date()];
        connect.query(sql,params,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'add failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode : '200',
                    body:{}
                }));
            }
        });
    },
    deleteBook:function(req,res,next){
        let sql = 'delete from book where id="'+req.body.id;
        connect.query(sql,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'add failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode : '200',
                    body:{}
                }));
            }
        });
    },
    updateBook:function(req,res,next){
        let book = req.body;
        let sql="update book set name='"+book.name+"'";
        connect.query(sql,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'update failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode : '200',
                    body:{}
                }));
            }
        });
    },
    borrowBook:function(req,res,next){
        var borrow = req.body;
        let sql='update book set status=1,begin_date='+borrow.begin_date+',end_date='+borrow.end_date+',user_id='+borrow.user_id+' where number="'+borrow.number+'"';
        connect.query(sql,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'update failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode : '200',
                    body:{}
                }));
            }
        });
    },
    returnBook:function(req,res,next){
        var borrow = req.body;
        let sql='update book set status=0,begin_date=null,end_date=null,user_id="" where id="'+borrow+'"';
        connect.query(sql,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'update failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode : '200',
                    body:{}
                }));
            }
        });
    }
}