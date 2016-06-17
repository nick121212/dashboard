import utils from '../../utils';

exports = module.exports = (app, db) => {
    let {sequelize} = db;

    return (req, res, next) => {
        let sql = [];
        let roleList = req._roleList;

        sql.push(' SELECT node.*,(count(parent.id)-1) as depth');
        sql.push(' FROM menu as node, menu as parent');
        sql.push(' where node.lft between parent.lft and parent.rgt');
        sql.push(' and node.key in (select distinct a.parentKey from rolegroup as rg');
        sql.push(' inner join groupaction as ga on rg.groupKey = ga.groupKey');
        sql.push(' inner join action as a on a.key = ga.actionKey');
        sql.push(' where rg.rolekey in ($1))');
        sql.push(' group by node.id');
        sql.push(' order by node.lft');

//         sql.push('SELECT node.*,(count(parent.id)-1) as depth');
//         sql.push('  FROM menu as node, menu as parent');
//         sql.push('  where node.lft between parent.lft and parent.rgt');
//         sql.push('  group by node.id');
//         sql.push('  order by node.lft;');

        sequelize.query(sql.join(''), {
            bind: [roleList]
        }).then((results) => {
            res.json(results[0]);
        }, next);
    };
}