import passport from 'passport';

exports = module.exports = (app, db, errors, config) => {
    return (req, res, next) => {
        let err = new errors.AuthenticationRequiredError("Please provide authentication.");
        err.status = 403;
        next(err);
    };
}