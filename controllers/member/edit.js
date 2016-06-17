import utils from '../../utils';

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.member;
    let {models} = db;
    let Model = models[name];

    return (req, res, next) => {
        let login = req.params[name];

        if (!login) {
            return next(new errors.ArgumentError("登录名不正确！"));
        }

        Model.findOne({
            where: {
                login: login
            }
        }).then((modelInstance) => {
            if (!modelInstance) {
                return res.json({role: ""});
            }
            res.json(modelInstance);
        }, next);
    };
}