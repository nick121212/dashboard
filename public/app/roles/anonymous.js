define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.init = function ($q, Permission, Restangular, $rootScope) {
        var promise = Restangular.oneUrl("/", "/" + $rootScope["apiPrefix"]).one("login", "user").doGET;
        Permission.defineRole("anonymous", function () {
            var deferred = $q.defer();
            $q.all([promise()]).then(function (results) {
                deferred.reject();
            }).catch(function () {
                deferred.resolve();
            });
            return deferred.promise;
        });
    };
});
//# sourceMappingURL=anonymous.js.map