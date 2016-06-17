import utils from '../../utils';
import _ from 'lodash';

exports = module.exports = () => {
    return (req, res) => {
        let sites = ["LCK"];
        let sitesObj = [];
        
        _.each(sites, (site)=> {
            "use strict";
            sitesObj.push({
                key: site,
                title: site
            });
        });

        res.json({
            rows: sitesObj
        });
    };
}