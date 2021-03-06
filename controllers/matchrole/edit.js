import utils from '../../utils';

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.matchrole;
    let {models} = db;
    let Model = models[name];

    return (req, res, next) => {
        let id = ~~req.params[name];

        if (!id) {
            return next(new errors.ArgumentError("id不正确！"));
        }

        Model.findById(id).then((modelInstance) => {
            if (!modelInstance) {
                return next(new errors.NotFoundError(`id[${id}] not exist!`));
            }
            modelInstance.roles = JSON.parse(modelInstance.roles);
            res.json(modelInstance);
        }, next);
    };
}