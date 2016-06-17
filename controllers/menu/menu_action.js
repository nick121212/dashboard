import utils from '../../utils';
import * as _ from "lodash";

exports = module.exports = (app, db) => {
    let {sequelize} = db;

    return (req, res, next) => {
        let sql = [];
        let name = utils.modelNames.menu;
        let menu = req.params[name];

        sql.push(' select a.* from action as a');
        sql.push(' inner join groupaction as ga on a.key = ga.actionKey');
        sql.push(' where a.parentKey = $1 and ga.groupKey in ($2)');

        console.log("------s-s-s-ss-s-s-s-", sql.join(''), menu, req._groups.join(','));

        sequelize.query(sql.join(''), {bind: [menu, req._groups]}).then((results) => {
            res.json(results[0]);
        }, next);
    };
}