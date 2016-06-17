module.exports = (app,db, errors, config) => {
    let sites = app.resource(`${config.site}api/sites`, app.controllers.msite);
}