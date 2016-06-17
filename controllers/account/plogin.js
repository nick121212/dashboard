import passport from 'passport';

exports = module.exports = (app, db, errors, config) => {
    return (req, res, next)=> {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                err.status = 403;
                return next(err);
            }
            if (!user) {
                return next(info);
            }
            req.logIn(user, function (err) {
                if (err) {
                    err.status = 403;
                    return next(err);
                }
                return res.json({
                    login: 'ok'
                });
            });
        })(req, res, next);
    };
}