'user strict';
var express = require('express');
var connect =  require('../db/db.js');
var tool = require('../tool/tool.js');

module.exports = {
    getUserList:function(req,res,next){
        let user = req.query.user;
        let sql = '';
        console.log(sql);
        connect.query(sql, function (error, results, fields) {
            if (error) {
                res.end(JSON.stringify({
                    resultCode : '-1',
                    message:'query failed'
                }));
                return;
            };
            res.end(JSON.stringify(results));
        });
    },
  getUserInfo:function(req,res,next){
    let id = req.query.id;
    if(tool.isEmpty(id)){
      res.end(JSON.stringify({
        resultCode : '-1',
        message:'param error'
      }));
      return;
    }
    let sql = 'select * from user where id='+id;
    console.log(sql);
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
      let user = req.query;
      if(tool.isEmpty(user)){
          res.end(JSON.stringify({
              resultCode : '-1',
              message:'param error'
          }));
          return;
      }
      let sql = 'insert into user value(?,?,?,?,?,?,?,?,?,?)';
      console.log(sql);
      let params = [tool.uuid(),user.name,'111111',user.mobile,user.tel,user.email,new Date(),'','',user.role];
      connect.query(sql,params,function(err,result){
          if(err){
              console.log(err)
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
    let user = req.query.user;
    if(tool.isEmpty(user)){
        res.end(JSON.stringify({
            resultCode : '-1',
            message:'param error'
        }));
        return;
    }
    let sql = 'update user set name=?,mobile=?,tel=?,email=?,update_date=?';
    let update_date = new Date();
    let params = [user.name,user.mobile,user.tel,user.email,update_date];
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
    let id = req.query.id;
    if(tool.isEmpty(id)){
      res.end(JSON.stringify({
        resultCode : '-1',
        message:'param error'
      }));
      return;
    }
    let sql = "delete from user where id='"+id+"'";
    console.log(sql);
      connect.query(sql,function(err,result){
      if(err){
        res.end(JSON.stringify({
          resultCode : '-1',
          message:'delete failed'
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
      let username = req.query.name,
          password = req.query.password
      let sql = "select * from user where name='"+username+ "' and password='"+password+"'";
      console.log(sql);
      connect.query(sql,function(err,result){
          console.log(result);
          let user = result[0];
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
