const db = require('../db/db.js');
db.connect();
db.once('open' ,function() {
    console.log('连接数据成功')
});
db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    db.disconnect();
});
db.on('close', function() {
    console.log('数据库断开');
});
module.exports = db
