'user strict';
var express = require('express');
var connect =  require('../db/db.js');
var tool = require('../tool/tool.js');

module.exports = {
  getUserInfo:function(req,res,next){
    const id = req.query.id;
    if(tool.isEmpty(id)){
      res.end(JSON.stringify({
        resultCode : '-1',
        message:'param error'
      }));
      return;
    }
    var sql = 'select * from user where id='+id;
      connect.query(sql, function (error, results, fields) {
        if (error) {
            res.end(JSON.stringify({
                resultCode : '-1',
                message:'query failed'
            }));
            return;
        };
        console.log(results[0]);
        res.end(JSON.stringify(results));
    });
  },
  addUser:function(req,res,next){
      const user = req.query.user;
      if(tool.isEmpty(user)){
          res.end(JSON.stringify({
              resultCode : '-1',
              message:'param error'
          }));
          return;
      }
      var sql = 'insert into user value(?,?,?,?,?,?,?,?,?,?)';
      var create_date = new Date();

      var params = [tool.uuid(),'000000',user.name,user.mobile,user.tel,user.email,create_date,'','',user.role];
      connect.query(sql,params,function(err,result){
          if(err){
              res.end(JSON.stringify({
                  resultCode : '-1',
                  message:'add failed'
              }));
              return;
          }
          res.end(JSON.stringify({
              resultCode : '200',
              message:'add success'
          }));
      });
  },
  updateUser:function(req,res,next){
    const user = req.query.user;
    if(tool.isEmpty(user)){
        res.end(JSON.stringify({
            resultCode : '-1',
            message:'param error'
        }));
        return;
    }
    var sql = 'update user set name=?,mobile=?,tel=?,email=?,update_date=?';
    var update_date = new Date();

    var params = [user.name,user.mobile,user.tel,user.email,update_date];
    connect.query(sql,params,function(err,result){
      if(err){
        res.end(JSON.stringify({
            resultCode : '-1',
            message:'update failed'
        }));
        return;
      }
      res.end(JSON.stringify({
          resultCode : '200',
          message:'update success'
      }));
    });
  },
  deleteUser:function(req,res,next){
    const id = req.query.id;
    if(tool.isEmpty(id)){
      res.end(JSON.stringify({
        resultCode : '-1',
        message:'param error'
      }));
      return;
    }
    var sql = 'delete from user where id='+id;
      connect.query(sql,function(err,result){
      if(err){
        res.end(JSON.stringify({
          resultCode : '-1',
          message:'query failed'
        }));
        return;
      }
      res.end(JSON.stringify({
        resultCode : '200',
        message:'delete success'
      }));
    });
  },
  login:function(req,res,next){
      var username = req.params.name,
          password = req.params.password;
      var sql = 'select * from user where name='+username+' and password='+password;
      connect.query(sql,function(err,result){
          var user = result[0];
          if(result.length == 0){
              res.end(JSON.stringify({
                  resultCode : '-1',
                  message:'user not exist'
              }));
          }else{
              console.log('============='+user.name+'已经登录===============');
              req.session.user = user;
              res.end(JSON.stringify({
                  resultCode:'200',
                  message:'login success'
              }));
          }
      })
  },
  logout:function(req,res,next){
      req.session.destroy(function(){
          res.end(JSON.stringify({
              resultCode:'200',
              message:'user logout'
          }));
      })
  }
}
