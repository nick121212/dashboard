import ref = require('ref');
import angular = require('angular');

export class TrustHtmlFilter {
    public static _name:string = 'trustHtml';
    public static filter:Array<any> = ['$sce', ($sce)=> {
        return (val):string => {
            return $sce.trustAsHtml(val);
        };
    }];
}

//filterModule.module.filter('stringDate', stringDate.filter);