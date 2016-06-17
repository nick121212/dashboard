module.exports = (app,db, errors, config) => {
    let menu = app.resource(`${config.site}api/menus`, app.controllers.menu);
    menu.get("/all", app.controllers.menu.sidemenu);
    menu.get("/:menu/actions", app.controllers.menu.menu_action);
}