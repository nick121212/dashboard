define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.init = function ($q, Permission, Restangular, $rootScope) {
        var promise = Restangular.oneUrl("/", "/" + $rootScope["apiPrefix"]).one("login", "user").doGET;
        Permission.defineRole("user", function () {
            var deferred = $q.defer();
            $q.all([promise()]).then(function (results) {
                deferred.resolve(results[0]);
            }).catch(function () {
                deferred.reject(403);
            });
            return deferred.promise;
        });
    };
});
//# sourceMappingURL=user.js.map