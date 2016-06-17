module.exports = (app, db, errors, config) => {
    let matchrole = app.resource(`${config.site}api/matchroles`, app.controllers.matchrole);
}