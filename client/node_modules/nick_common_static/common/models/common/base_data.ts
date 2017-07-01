/**
 * Created by NICK on 15/10/12.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

export module Common {
    export class BaseData {
        public createAt:string;
        public updateAt:string;
        public static _schema:any;

        constructor(data?:any) {
            data && typeof data == 'object' && this.copyData(data);
        }

        copyData(data:any) {
            for (var p in data) {
                this[p] = data[p];
            }
        }
    }
}