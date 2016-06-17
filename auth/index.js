import qs from 'qs';

module.exports = (app, db, errors, config) => {
    // 使用api需要登录验证
    app.all(`/${config.site}api/*`, (req, res, next) => {
        // 登录验证
        if (!req.isAuthenticated()) {
            return res.redirect(`/${config.site}login`);
        }
        // 验证权限
        app.controllers.account.check(req.user, qs.parse(req.query, {plainObjects: true})).then((results)=> {
            req._roleList = results.matchrolec;
            req._groups = results.roleGroups;
            next();
        }, (err)=> {
            next(err);
        });
    });
};