var async = require('async');
var Promise = require('bluebird');
var _ = require('lodash');
var rest = require('restler');
var fs = require('fs');
var path = require('path');
var app = require('../../server/server');
var md5 = require('blueimp-md5');
var gm_secret = '6db16ea48786f83c65750dd438bfe009';

function executeCommand(server, model, data, req) {
    return new Promise(function (resolve, reject) {
        var params = {
                token: req.query.access_token,
                user_token: req.query.user_token
            },
            uri,
            paramList,
            htp,
            err,
            options = {
                query: params,
                method: model.type,
                timeout: 5000
            };

        if (model.params) {
            paramList = model.params.split(',');
            if (data.pageCount) {
                data.per_page = data.pageCount;
            }
            //处理参数params
            _.forEach(paramList, function (param) {
                pd = null;
                _.forEach(param.split('.'), function (path) {
                    param = path;
                    if (!pd) {
                        pd = data[path];
                    } else {
                        pd = pd[path];
                    }
                    if (!pd) {
                        return false;
                    }
                });
                pd && (params[param] = pd);
            });
        }

        //拼接接口的地址
        if (!model.baseUrl) {
            uri = server.serProtocol + '://' + server.serAddress + ':' + (server.serPort || 80) + model.interface;
        } else {
            uri = 'http://' + model.baseUrl + ':' + (model.port || 80) + model.interface;
        }

        options.query.sign = md5(uri + gm_secret);

        console.log("options:", options);
        console.log("data:", data);
        console.log("model:", model);
        console.log("server:", server);
        console.log("uri:", uri);
        console.log("gm_secret:", gm_secret);

        switch (model.type.toLowerCase()) {
            case 'get':
                htp = rest.get(uri, options);
                break;
            case 'post':
		if(!model.clearData){
		    options.data = data;
		}
                htp = rest.post(uri, options);
                break;
        }
        htp.on('success', function (result) {
                try {
                    result = JSON.parse(result);
                } catch (e) {

                }
                console.log("result:", result);
                if (result.result === 'error') {
                    err = new Error(result.msg);
                    err.status = 400;
                    reject(err);
                    return;
                }

                if (result.data && model.interface === "/api/export_used_gift_codes") {
                    var fn = new Date().getTime().toString();

                    fs.writeFile(path.join('gifts', fn), result.data, function (err) {
                        if (err) {
                            err.status = 400;
                            return reject(err);
                        }
//                        access_token: req.query.access_token,
//                            user_token: req.query.user_token

                        result.url = '/export_gift?user_token=' + req.query.user_token + '&token=' + req.query.access_token + '&name=' + data['title'] + '&filename=' + fn;
                        resolve(result);
                    });

                    return;
                } 
	/*else if(result.data && result.data.user_token && model.interface === "/api/updateagentinfo"){
		    Menu.dataSource.connector.execute("insert into person(aorid, nickname,userToken) values(9, ?, ?)", 	[result.data.username, result.data.user_token], next);
		}*/

                resolve(result);
            })
            .on('error', reject)
            .on('timeout', function (ms) {
                err = new Error('调用接口超时:' + ms);
                err.status = 400;
                reject(err);
            });

    });
}

module.exports = function (Interface) {
    Interface.execute = function (req, data, id, next) {
        var err;

        async.auto({
            model: function (cb) {
                Interface.findOne({
                    where: {
                        interfaceId: id
                    }
                }, cb);
            },
            server: function (cb) {
                console.log("data-origin", data);
                if (data && data['change_server']) {
                    cb(null, data['change_server']);
                    return;
                }

                app.models.server.findOne({
                    where: {
                        isDefault: true
                    }
                }, cb);
            },
            execute: ['model', 'server', function (cb, results) {
                if (results.model) {
                    executeCommand(results.server, results.model, data, req).then(function (data) {
                        cb(null, data);
                    }, cb);
                } else {
                    err = new Error('没有找到接口!');
                    err.status = 400;
                }
            }]
        }, function finish(err, results) {
            if (err) {
                next(err);
                return;
            }
            next(null, results.execute);
        });

    };

    Interface.remoteMethod(
        'execute', {
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'}},
                {arg: 'data', type: 'object', http: {source: 'body'}},
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {root: true, type: 'object'},
            http: {verb: 'post', path: '/:id/execute'}
        }
    );
};
