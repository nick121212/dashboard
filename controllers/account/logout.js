exports = module.exports = (app, db, errors, config) => {
    return (req, res, next) => {
        req.logout();
        res.redirect(`/${config.site}login`);
    };
}