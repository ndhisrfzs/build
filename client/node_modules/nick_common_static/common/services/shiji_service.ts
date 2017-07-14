/**
 * Created by NICK on 15/6/17.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import ref = require('ref');

export class ShijiService {
    public static _name:string = 'ShijiService';

    public static factory:Array<any> = ['$rootScope', '$q', '$http', 'config', ($rootScope, $q, $http, config):any=> {
        return {
            /*
             * 指定时间的时计图片
             * */
            fighting_history: (model:Shiji.TimeModel)=> {
                return $http({
                        method: 'GET',
                        url: config.shiji_api + '/shiji' + "/image",
                        params: {
                            time: model.time,
                        },
                        needToken: false
                    }
                );
            }
        };
    }];
}