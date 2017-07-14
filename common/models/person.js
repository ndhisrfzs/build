var async = require('async');
var md5 = require('blueimp-md5');

module.exports = function(Person) {
	Person.getUser = function (req, next) {
        //Account.dataSource.connector.execute("SELECT name FROM mall.Province", next);
        console.log("-----------------------" + req.query.access_token);
 		async.auto({
 			getAccount : [function(cb){
		        Person.findOne({
		        	where: {
			        	userToken:req.query.access_token ? req.query.access_token : ""
			        }
		        }, cb);
		    }],
		   	checkAccount : ['getAccount', function(cb, results){
		   		var account = results.getAccount;
		   		if(account == null){
		   			account = {}
		   			account.result_code = -2202;
		   		}
		   		else
		   		{
		   			account.result_code = 1;
		   		}
		   		cb(null, account);
		   	}]
    	}, function finish(err, results){
			if (err) {
				next(err);
			} else {
				next(null, results.checkAccount);
			}
		});
	};
	Person.remoteMethod(
        'getUser', {
            accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}],
            returns: {root: true, type: 'object'},
            http: {verb: 'post', path: '/get_user'}
        }
    );

   	Person.login = function(req, data, next){
   		async.auto({
 			model : [function(cb){
 				 Person.findOne({
		        	where: {
			        	nickname:data.username
			        }
		        }, cb);
		    }],
		    trans: ['model', function (cb) {
                Person.beginTransaction({isolationLevel: Person.Transaction.READ_COMMITTED}, cb);
            }],
		   	check : ['trans', function(cb, results){
 				var usertoken = md5(data.username + data.password + req.query.app_token);
 				console.log(usertoken);
		   		var account = results.model;

		   		if(account != null && account.userToken == usertoken){
		   			cb(null, account);
		   		}
		   		else
		   		{
		   			cb(null, null);
		   		}
		   	}],
		   	commit: ['check', function (cb, results) {
                results.trans.commit(cb);
            }]
    	}, function finish(err, results){
			if (err) {
				next(err);
			} else {
				console.log("TTT-----------------------------------"+results.check)
				if(results.check != null) {

					var ret = {};
					ret.user_token = results.check.user_token;
					ret.access_token = ret.user_token;
			   		ret.refresh_token = ret.user_token;
			   		next(null, ret);
			   	}
			}
		});
   	}

   	Person.remoteMethod(
        'login', {
            accepts: [
            	{arg: 'req', type: 'object', http: {source: 'req'}},
            	{arg: 'data', type: 'object', http: {source: 'body'}}
            ],
            returns: {root: true, type: 'object'},
            http: {verb: 'post', path: '/login'}
        }
    );
};
