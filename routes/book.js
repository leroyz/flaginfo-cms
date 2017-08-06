'use strict';
var express = require('express');
var connect =  require('../db/db.js');
var tool = require('../tool/tool.js');

module.exports = {
    getBookList:function(req,res,next){
        let option = req.body;
        let resultData={};
        let sql = 'select book.id,book.number,book.name,book.status,user.name username from book left join user on book.user_id=user.id where 1=1';
        if(option.number){
            sql += ' and book.number="'+option.number+'"';
        }
        if(option.name){
            sql += ' and book.name like "%'+option.name+'%"';
        }
        console.log(sql)
        connect.query(sql,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'query failed'
                }));
            }else{
                resultData['total'] = result.length;
                sql += ' limit '+(option.pageNo-1)*option.pageSize+','+option.pageNo*option.pageSize;
                connect.query(sql,function(err,result){
                    if(err){
                        res.end(JSON.stringify({
                            resultCode:'-1',
                            message:'query failed'
                        }));
                    }else{
                        resultData['list'] = result;
                        res.end(JSON.stringify({
                            resultCode:'200',
                            body:resultData
                        }));
                    }
                });
            }
        });
    },
    addBook:function(req,res,next){
        var book = req.body;
        connect.query('select id from book where number="'+book.number+'"',function(err,result){
            if(result.length > 0){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'该编号已经存在'
                }));
                return;
            }else{
                let sql = 'insert into book values(?,?,?,null,now(),?,null,null,null)';
                var params = [tool.uuid(),book.name,book.number,0];
                console.log(params);
                connect.query(sql,params,function(err,result){
                    if(err){
                        console.log(err);
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
            }
        });

    },
    deleteBook:function(req,res,next){
        let sql = 'delete from book where id="'+req.body.id+'"';
        connect.query(sql,function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'delete failed'
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
        let sql='update book set status=1,begin_date=now(),end_date="'+borrow.endDate+'",user_id="'+borrow.userId+'" where id="'+borrow.bookId+'"';
        console.log(sql);
        connect.query(sql,function(err,result){
            if(err){
                console.log(err);
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
    //我的借阅
    myBorrow:function(req,res,next){
        var option = req.body;
        var resultData = {};
        let sql='select * from book where user_id="'+option.userId+'"';
        console.log(sql);
        connect.query(sql,function(err,result){
            if(err){
                console.log(err);
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'update failed'
                }));
            }else{
                resultData['total'] = result.length;
                sql += ' limit '+(option.pageNo-1)*option.pageSize+','+option.pageNo*option.pageSize;
                connect.query(sql,function(err,result){
                    if(err){
                        console.log(err);
                        res.end(JSON.stringify({
                            resultCode : '-1',
                            message:'update failed'
                        }));
                    }else{
                        resultData['list'] = result;
                        res.end(JSON.stringify({
                            resultCode : '200',
                            body:resultData
                        }));
                    }
                });
            }
        });
    },
    returnBook:function(req,res,next){
        var option = req.body;
        let sql='update book set status=0,begin_date=null,end_date=null,return_date=now(),user_id="" where id="'+option.id+'"';
        console.log(sql);
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
    getAllBook:function(req,res,next){
        connect.query('select * from book where status=0',function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'update failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode : '200',
                    body:result
                }));
            }
        });
    },
    getAllStaff:function(req,res,next){
        connect.query('select * from user where role !=0',function(err,result){
            if(err){
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'get failed'
                }));
            }else{
                res.end(JSON.stringify({
                    resultCode : '200',
                    body:result
                }));
            }
        });
    }
}