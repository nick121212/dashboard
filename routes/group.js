module.exports = (app, db, errors, config) => {
    let groups = app.resource(`${config.site}api/groups`, app.controllers.group);
    let groupactions = app.resource(`${config.site}api/groupactions`, app.controllers.groupaction);
}