exports = module.exports = (app, db) => {
    return (req, res, next) => {
        res.json({
            flag: "userInfo",
            data: req.user
        });
    };
}