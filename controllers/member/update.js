import utils from '../../utils';

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.member;
    let {models} = db;
    let Model = models[name];

    return (req, res, next) => {
        let model = req.body;

        model = {
            login: model.login,
            role: model.role
        };

        if (!model.login) {
            return next(new errors.ArgumentError("login不正确！"));
        }

        Model.findOne({
            where: {
                login: model.login
            }
        }).then((modelInstance) => {
            if (!modelInstance) {
                return app.controllers.member.create(req, res, next);
            }

            delete model.createdAt;
            model.updatedAt = new Date();
            modelInstance.updateAttributes(model, {individualHooks: true}).then((newModel) => {
                res.json(newModel);
            }, next);
        }, next);
    };
}