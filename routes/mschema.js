module.exports = (app,db, errors, config) => {
    let schema = app.resource(`${config.site}api/schemas`, app.controllers.schema);
}