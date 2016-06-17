define(["require", "exports"], function (require, exports) {
    "use strict";
    var CompileDirective = (function () {
        function CompileDirective() {
        }
        CompileDirective.init = function (mod) {
            mod.directive(CompileDirective._name, CompileDirective.directive);
        };
        CompileDirective._name = "dyCompile";
        CompileDirective.directive = [
            "$compile",
            function ($compile) {
                var directive = {
                    replace: true,
                    restrict: "A",
                    scope: {
                        item: "=",
                        $index: "@",
                        parent: "="
                    },
                    link: function ($scope, $element, $attrs) {
                        var dummyScope = {
                            $destroy: angular.noop
                        }, childScope, content, destoryChildScope = function () {
                            (childScope || dummyScope).$destroy();
                        };
                        $attrs.$observe("html", function (html) {
                            if (html) {
                                destoryChildScope();
                                childScope = $scope.$new(false);
                                childScope["item"] = $scope["item"];
                                childScope["$index"] = $scope["$index"];
                                childScope["parent"] = $scope["parent"];
                                if (html.search("<") === 0) {
                                    content = $compile(html)(childScope);
                                    $element.replaceWith(content);
                                }
                                else {
                                    content = childScope.$eval(html);
                                    $element.text(content);
                                }
                            }
                        });
                    }
                };
                return directive;
            }
        ];
        return CompileDirective;
    }());
    exports.CompileDirective = CompileDirective;
});
//# sourceMappingURL=compile_directive.js.map