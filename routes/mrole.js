
module.exports = (app,db, errors, config) => {
    let roles = app.resource(`${config.site}api/roles`, app.controllers.role);
    let rolegroups = app.resource(`${config.site}api/rolegroups`, app.controllers.rolegroup);
}