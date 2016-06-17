import passport from 'passport';
import LocalStrategy, {Strategy} from 'passport-local';

module.exports = (app) => {

    passport.use('local', new LocalStrategy(
        function (username, password, done) {
            console.log(username, password);
            app.controllers.interface.execute_interface("ecms-login", {}, {
                login: username,
                pass: password,
                site: "china"
            }, "").then((result) => {
                console.log("---------",result);
                return done(null, result);
            }, (err) => {
                console.log("---------",err);
                return done(null, false, err);
            });
        }));

    passport.serializeUser(function (user, done) {//保存user对象
        done(null, user);//可以通过数据库方式操作
    });

    passport.deserializeUser(function (user, done) {//删除user对象
        done(null, user);//可以通过数据库方式操作
    });
};