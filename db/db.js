var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'password',
    database:'flaginfo-web',
    timezone:'08:00'
})
connection.once('open' ,function() {
    console.log('连接数据成功')
});
connection.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    db.disconnect();
});
connection.on('close', function() {
    console.log('数据库断开');
});
module.exports = connection;
