var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var schedule = require("node-schedule");

module.exports = function (server) {
    function scanFolder(path) {
        var fileList = [],
            folderList = [],
            walk = function (path, fileList, folderList) {
                files = fs.readdirSync(path);
                files.forEach(function (item) {
                    var tmpPath = path + '/' + item,
                        stats = fs.statSync(tmpPath);

                    if (stats.isDirectory()) {
                        walk(tmpPath, fileList, folderList);
                        folderList.push(tmpPath);
                    } else {
                        fileList.push(tmpPath);
                    }
                });
            };
        walk(path, fileList, folderList);

        return {
            'files': fileList,
            'folders': folderList
        }
    }

    var rule = new schedule.RecurrenceRule();

    rule.dayOfWeek = [0, new schedule.Range(1, 6)];
    rule.hour = 20;
    rule.minute = 0;
    schedule.scheduleJob(rule, function () {
        console.log("执行清理文件任务!");
        _.each(_.dropRight(scanFolder("gifts").files, 3), function (path) {
            fs.unlink(path);
        });
    });
};
