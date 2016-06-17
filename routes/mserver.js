module.exports = (app,db, errors, config) => {
    app.resource(`${config.site}api/servers`, app.controllers.server);
}