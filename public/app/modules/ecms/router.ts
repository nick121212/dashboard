import ref = require("ref");

export var init = ($urlRouterProvider, $stateProvider) => {
    $stateProvider.state("home.teamInfo", {
        url: "pages/teams/:key/:teamId",
        data: {
            permissions: {
                except: ["anonymous"],
                only: ["user"]
            }
        },
        views: {
            "content_main": {
                templateUrl: "app/modules/ecms/tpls/team_info.html",
                controller: "TeamInfoController",
                controllerAs: "managerCtl"
            }
        }
    });
};