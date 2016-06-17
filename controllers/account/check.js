import async from 'async';
import utils from '../../utils';
import * as _ from 'lodash';

exports = module.exports = (app, db, errors) => {
    let {models} = db;
    let MemberModel = models[utils.modelNames.member];
    let GroupModel = models[utils.modelNames.group];
    let MatchroleModel = models[utils.modelNames.matchrole];
    let RoleGroupModel = models[utils.modelNames.rolegroup];
    /**
     * 通过当前登录用户查询到当前用户的赛事角色
     * 查找角色中包含的【site】的所有角色
     * 通过角色来获取当前的权限组的列表
     * 权限组的列表中获取所有的接口列表
     * 判断当前接口是否在列表中
     */
    return (user, query) => {
        let site = query.site || "lck";
        let login = user ? user.login : "nick";
        let interfaceKey = query._interfaceKey;
        let defer = Promise.defer();
        let noPermissionErr = new errors.NotFoundError(`当前用户没有权限!`);

        site = site.toUpperCase();
        if (!interfaceKey) {
            defer.reject(noPermissionErr);
        } else {
            async.auto({
                member: (cb)=> {
                    MemberModel.findOne({
                        where: {
                            login: login
                        }
                    }).then((result) => cb(null, result), cb);
                },
                check: ["member", (cb, results) => {
                    if (!results.member) {
                        return cb(noPermissionErr);
                    }
                    cb();
                }],
                matchrole: ["check", (cb, results)=> {
                    MatchroleModel.findOne({
                        where: {
                            key: results.member.role
                        }
                    }).then((result) => {
                        if (!result) {
                            return cb(noPermissionErr);
                        }
                        cb(null, result);
                    }, cb);
                }],
                matchrolec: ["matchrole", (cb, results)=> {
                    let roles = JSON.parse(results.matchrole.roles);
                    let rolesObj = _.keyBy(roles, "site");
                    let roleList = rolesObj[site];

                    if (!roleList || !roleList.roleList || !roleList.roleList.length) {
                        return cb(noPermissionErr);
                    }
                    cb(null, roleList.roleList);
                }],
                roleGroups: ["matchrolec", (cb, results)=> {
                    RoleGroupModel.findAndCountAll({
                        where: {
                            roleKey: {
                                $in: results.matchrolec
                            }
                        }
                    }).then((res)=> {
                        console.log("roleGroups", res);
                        if (!res.count) {
                            return cb(noPermissionErr);
                        }
                        cb(null, _.map(res.rows, function (d) {
                            return d.groupKey;
                        }));
                    }, cb);
                }],
                groups: ["roleGroups", (cb, results)=> {
                    GroupModel.findAndCountAll({
                        where: {
                            key: {
                                $in: results.roleGroups
                            }
                        }
                    }).then((res)=> {
                        console.log("_groups", res.rows);
                        if (!res.count) {
                            return cb(noPermissionErr);
                        }
                        cb(null, res.rows);
                    }, cb);
                }],
                check1: ["groups", (cb, results)=> {
                    let find = false;

                    _.each(results.groups, (group)=> {
                        let interfaces = JSON.parse(group.interfaces);

                        let index = _.findIndex(interfaces, function (o) {
                            return o === interfaceKey;
                        });
                        if (index >= 0) {
                            find = true;
                            return false;
                        }
                    });

                    find && cb();
                    !find && cb(noPermissionErr);
                }]
            }, (err, results)=> {
                if (err) {
                    return defer.reject(err);
                }

                defer.resolve(results);
            });
        }

        return defer.promise;
    };
};