export class StyleDirective {
    public static _name:string = 'mdStyleColor';

    /**
     * 初始化函数
     */
    public static init(mod:angular.IModule) {
        mod.directive(StyleDirective._name, StyleDirective.directive);
    }

    public static directive:Array<any> = ['$rootScope', 'mdSideMenuSections', function ($rootScope, mdSideMenuSections) {
        var directive:ng.IDirective = {
            restrict: 'A',
            scope: {
                mdStyleColor: '='
            },
            link: ($scope, $element, $attrs, $ctrl)=> {
                let themeColors, split, hueR, colorR, colorA, hueA, colorValue,
                    _apply_color = function () {
                        for (let p in $scope["mdStyleColor"]) {
                            if ($scope["mdStyleColor"].hasOwnProperty(p)) {
                                themeColors = mdSideMenuSections.theme.colors,
                                    split = ($scope["mdStyleColor"][p] || '').split('.');


                                if (split.length < 2) {
                                    split.unshift('primary');
                                }
                                hueR = split[1] || 'hue-1';
                                colorR = split[0] || 'primary'; // 'warn'

                                // Absolute color: 'orange'
                                colorA = themeColors[colorR] ? themeColors[colorR].name : colorR;
                                // Absolute Hue: '500'
                                hueA = themeColors[colorR] ? (themeColors[colorR].hues[hueR] || hueR) : hueR;
                                colorValue = mdSideMenuSections.palettes[colorA][hueA] ? mdSideMenuSections.palettes[colorA][hueA].value : mdSideMenuSections.palettes[colorA]['500'].value;

                                if (hueA !== '0') {
                                    $element.css(p, 'rgb(' + colorValue.join(',') + ')');
                                } else {
                                    $element.css(p, 'transparent');
                                }
                                // Add color to md-sidenav
                                // if ($element.parent().attr('md-component-id')) $element.parent().css(p, 'rgb(' + colorValue.join(',') + ')');
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
}