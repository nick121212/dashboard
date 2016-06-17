import Sequelize from 'sequelize';
import sequelizeImport from 'sequelize-import';
import _ from 'lodash';
import async from 'async';
import config from '../config';

let sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.options);
let models = sequelizeImport(__dirname + '/../models', sequelize, {
    exclude: ['index.js']
});

// 初始化数据库
sequelize.sync({ force: false }).then(() => {
//    models.action.findAndCountAll().then((datas)=> {
//     //    "use strict";
//     //    console.log(datas.rows.length);
//     //    _.each(datas.rows, (model)=> {
//     //        try {
//     //            let intefaces = JSON.parse(model.interfaces);
//     //            let array = [];
//     //            _.forEach(intefaces, (i)=> {
//     //                array.push(i.inteface);
//     //            });
//     //            console.log(JSON.stringify(array));
//     //            model.interfaces = JSON.stringify(array);
//     //            model.save();
//     //        } catch (e) {
//     //            console.log(e);
//     //        }
//     //    });
//    });
}, function(err) {
    console.log(err);
});

export default {
    sequelize: sequelize,
    Sequelize: Sequelize,
    models: models
};
