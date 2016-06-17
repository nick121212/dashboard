
module.exports = (app,db, errors, config) => {
    let action = app.resource(`${config.site}api/actions`, app.controllers.action);
}