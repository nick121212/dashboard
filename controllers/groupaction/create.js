import async from 'async';
import utils from '../../utils';
import * as _ from 'lodash';

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.groupaction;
    let {models, sequelize} = db;
    let Model = models[name];
    let GroupModel = models[utils.modelNames.group];

    return (req, res, next) => {
        let models = req.body, createBulk;

        if (typeof models !== "object" || !models.groupKey) {
            return next(new errors.ValidationError("数据没有填写完整！", 412));
        }

        /**
         * 先查找group
         * 存在group 则删除掉groupaction表中关于当前group的数据
         * 更新group表中的interfaces字段
         * 插入新的输入到groupaction表
         */
        createBulk = (t) => {
            return new sequelize.Promise((resolve, reject) => {
                async.auto({
                    model: (cb) => {
                        GroupModel.findOne({
                            where: {
                                key: models.groupKey
                            }
                        }).then((result) => cb(null, result), cb);
                    },
                    check: ["model", (cb, results) => {
                        if (!results.model) {
                            return cb(new errors.NotFoundError(`key[${models.groupKey}] not exist!`));
                        }
                        cb();
                    }],
                    del: ["check", (cb, results) => {
                        sequelize.query('delete from groupaction where groupKey=$1', {
                            transaction: t,
                            bind: [models.groupKey]
                        }).then((result) => cb(null, result), cb);
                    }],
                    update: ["del", (cb, results)=> {
                        results.model.updateAttributes({
                            updateAt: new Date(),
                            interfaces: JSON.stringify(models.interfaces)
                        }, {transaction: t}).then(()=>cb(null), cb);
                    }],
                    bulkCreate: ["del", (cb, results) => {
                        if (_.isArray(models.groupactions) && models.groupactions.length) {
                            Model.bulkCreate(models.groupactions, {transaction: t}).then((result) => cb(null, results), cb);
                        } else {
                            cb();
                        }

                    }]
                }, (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results.model);
                });
            });
        };

        sequelize.transaction().then((t) => {
            return createBulk(t).then((results) => {
                return t.commit().then(() => res.json(results), next);
            }, (err) => {
                return t.rollback().then(() => next(err), next);
            });
        }, next);
    };
}