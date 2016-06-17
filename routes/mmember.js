module.exports = (app,db, errors, config) => {
    let member = app.resource(`${config.site}api/members`, app.controllers.member);
};