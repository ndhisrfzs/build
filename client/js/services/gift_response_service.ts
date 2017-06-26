/**
 * Created by NICK on 15/6/8.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */


import ref = require('ref');

export class Factory {
    public static _name:string = 'GiftInterceptorFactory';

    public static factory:Array<any> = [():any=> {
        return {
            'response': function (response) {
                var win;

                if (response.data && response.status == 200) {
                    if (response.data.url) {
                        win = window.open();
                        win.location.href = response.data.url;
                    }
                }

                return response;
            }
        };
    }];
}