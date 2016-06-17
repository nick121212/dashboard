define(["require", "exports"], function (require, exports) {
    "use strict";
    var StyleDirective = (function () {
        function StyleDirective() {
        }
        StyleDirective.init = function (mod) {
            mod.directive(StyleDirective._name, StyleDirective.directive);
        };
        StyleDirective._name = 'mdStyleColor';
        StyleDirective.directive = ['$rootScope', 'mdSideMenuSections', function ($rootScope, mdSideMenuSections) {
                var directive = {
                    restrict: 'A',
                    scope: {
                        mdStyleColor: '='
                    },
                    link: function ($scope, $element, $attrs, $ctrl) {
                        var themeColors, split, hueR, colorR, colorA, hueA, colorValue, _apply_color = function () {
                            for (var p in $scope["mdStyleColor"]) {
                                if ($scope["mdStyleColor"].hasOwnProperty(p)) {
                                    themeColors = mdSideMenuSections.theme.colors,
                                        split = ($scope["mdStyleColor"][p] || '').split('.');
                                    if (split.length < 2) {
                                        split.unshift('primary');
                                    }
                                    hueR = split[1] || 'hue-1';
                                    colorR = split[0] || 'primary';
                                    colorA = themeColors[colorR] ? themeColors[colorR].name : colorR;
                                    hueA = themeColors[colorR] ? (themeColors[colorR].hues[hueR] || hueR) : hueR;
                                    colorValue = mdSideMenuSections.palettes[colorA][hueA] ? mdSideMenuSections.palettes[colorA][hueA].value : mdSideMenuSections.palettes[colorA]['500'].value;
                                    if (hueA !== '0') {
                                        $element.css(p, 'rgb(' + colorValue.join(',') + ')');
                                    }
                                    else {
                                        $element.css(p, 'transparent');
                                    }
                                }
                            }
                        };
                        if (!mdSideMenuSections.theme || !mdSideMenuSections.palettes) {
                            return console.warn('ss-sidenav: you probably want to ssSideNavSectionsProvider.initWithTheme($mdThemingProvider)');
                        }
                        $scope.$watch('mdStyleColor', function (oldVal, newVal) {
                            if ((oldVal && newVal) && oldVal !== newVal) {
                                _apply_color();
                            }
                        });
                        _apply_color();
                    }
                };
                return directive;
            }];
        return StyleDirective;
    }());
    exports.StyleDirective = StyleDirective;
});
//# sourceMappingURL=mdstyle_directive.js.map