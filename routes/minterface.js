import multer  from 'multer';

module.exports = (app,db, errors, config) => {
    let resource = app.resource(`${config.site}api/interfaces`, app.controllers.interface, app);
    let upload = multer({ storage: multer.memoryStorage() });

    resource.post("/:interface/execute", app.controllers.interface.execute);

    // app.get("/ecms/api/interfaces/:interface/execute_ue", app.controllers.interface.execute_ue);
    // app.post("/ecms/api/interfaces/:interface/execute_ue",  app.controllers.interface.execute_ue);
}