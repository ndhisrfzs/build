var fs=require("fs"),path=require("path"),_=require("lodash"),schedule=require("node-schedule");module.exports=function(a){function b(a){var b=[],c=[],d=function(a,b,c){files=fs.readdirSync(a),files.forEach(function(e){var f=a+"/"+e,g=fs.statSync(f);g.isDirectory()?(d(f,b,c),c.push(f)):b.push(f)})};return d(a,b,c),{files:b,folders:c}}var c=new schedule.RecurrenceRule;c.dayOfWeek=[0,new schedule.Range(1,6)],c.hour=20,c.minute=0,schedule.scheduleJob(c,function(){console.log("执行清理文件任务!"),_.each(_.dropRight(b("gifts").files,3),function(a){fs.unlink(a)})})};