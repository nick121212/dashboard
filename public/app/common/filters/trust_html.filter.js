define(["require", "exports"], function (require, exports) {
    "use strict";
    var TrustHtmlFilter = (function () {
        function TrustHtmlFilter() {
        }
        TrustHtmlFilter._name = 'trustHtml';
        TrustHtmlFilter.filter = ['$sce', function ($sce) {
                return function (val) {
                    return $sce.trustAsHtml(val);
                };
            }];
        return TrustHtmlFilter;
    }());
    exports.TrustHtmlFilter = TrustHtmlFilter;
});
//# sourceMappingURL=trust_html.filter.js.map