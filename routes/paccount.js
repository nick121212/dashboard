module.exports = (app, db, errors, config) => {
    let idx = config.site.search("/");
    let account = app.resource(idx === config.site.length - 1 ? config.site.substring(0, idx) : config.site, app.controllers.account, app);

    account.get(`/login`, app.controllers.account.login);
    account.get(`/login/user`, app.controllers.account.userinfo);
    app.post(`/${config.site}login`, app.controllers.account.plogin, (req, res, next) => {
        res.json({
            login: 'ok'
        });
    });
    account.post(`/logout`, app.controllers.account.logout);
};