module.exports = {
    uuid:function(){
        /*算法一*/
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
        /*算法二*/
/*        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });*/
    },
    isEmpty:function(obj){
        if(obj === null || obj === undefined || obj === ''){
            return true;
        }else{
            return false;
        }
    },
    /**
     * 获取时间段
     * @param dateString
     */
    timeSlot:function(beginDate,endDate){
        var timeStamp = new Date(beginDate) - new Date(endDate);
        return (timeStamp/1000/60).toFixed(1);
    }
}