import async from 'async';
import utils from '../../utils';

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.member;
    let {models} = db;
    let Model = models[name];

    return (req, res, next) => {
        let model = req.body;

        if (typeof model !== "object" || !model.login) {
            return next(new errors.ValidationError("数据没有填写完整！", 412));
        }
        model = {
            login: model.login,
            role: model.role
        };
        Model.create(model, {individualHooks: true}).then((result) => res.json(result), next);
    };
}