const MINUTES = 1000 * 60;
const HOUR = MINUTES * 60;
const DAY = HOUR * 24;
Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}  
dateFrom = function(date,formet) {


    if (formet) {
        return date.format("yyyy-MM-dd hh:mm:ss");
    }

    var now = new  Date();
    var nowTimestamp = Date.parse(now);
    var distance = nowTimestamp - Date.parse(date);
    if (distance < HOUR) {
        return parseInt(distance / MINUTES)+" 分钟前";
    }
    var pulishEndDate =  new Date(new Date(date.toLocaleDateString()).getTime()+DAY);
    if ( now < pulishEndDate ) {
        return parseInt(distance / HOUR) + " 小时前";
    } 
    var pulishEnd2Date = new Date(new Date(date.toLocaleDateString()).getTime()+ 2 * DAY);
    if (now < pulishEnd2Date ) {
        return "昨天 "+date.getHours()+":"+date.getMinutes();
    }
    return date.getMonth() +1 +"-" +date.getDate();
}


numForm = function(num) {
    return  num > 10000 ? num / 10000 +"万" : num;
}
