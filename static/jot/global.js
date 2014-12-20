/**
 * Created by JJ on 2014/12/15.
 */
define("global", ["jotMenu"], function (menu) {

    function getFrameInfo() {
        var windowHeight = $("body").height();
        var windowWidth = $("body").width();
        var leftHeight = windowHeight - $("#header").height() - 2;
        var contentWidth = windowWidth - $("#leftNav").width() - 5;
        var contentHeight = windowHeight - $("#header").height() - $("#subMenu").height() - $("#toolbar").height();
        return {
            contentWidth: contentWidth,
            contentHeight: contentHeight,
            leftHeight: leftHeight
        }
    }

    var menuData = menu.menuData;
    var firstAppId = menu.firstAppId;
    var firstModuleId = menu.firstModuleId;
    var firstModules = menu.findModulesByAppId(firstAppId);

    var finfo = getFrameInfo();
    var frameVm = avalon.define("frameController", function (vm) {


        /**** 控制窗口resize start ****/
        vm.contentWidth = finfo.contentWidth;
        vm.contentHeight = finfo.contentHeight;
        vm.leftHeight = finfo.leftHeight;
        vm.contentWidth = finfo.contentWidth;
        vm.resetFrame = function () {
            var f = getFrameInfo();
            vm.contentWidth = f.contentWidth;
            vm.contentHeight = f.contentHeight;
            vm.leftHeight = f.leftHeight;
            var width = f.contentWidth;
            if (vm.showTree) {
                width = width - jQuery("#treeNav").width();
            }
            vm.contentWidth = width;
        }
        /**** 控制窗口resize end ****/
        vm.showTree = true;
        vm.query = {};
        vm.getPath = function () {
            return "" + vm.currentAppId + "/" + vm.currentModuleId + "/" + vm.currentAction;
        }
        vm.treeTemplate = null;
        vm.treeTitle = "treeTitle";
        vm.contentTemplate = null;
        vm.$apps = menuData;
        vm.currentAppId = firstAppId;
        vm.currentModuleId = firstModuleId;
        vm.currentAction = "index";
        vm.currentModules = firstModules;
        vm.selectApp = function (id) {
            vm.selectModule(id, menu.findFirstModuleByAppId(id));
        }
        vm.selectModule = function (appid, moduleId, action) {
            vm.currentAppId = appid;
            vm.currentModuleId = moduleId;
            vm.currentModules = menu.findModulesByAppId(appid);
            if (action) {
                vm.currentAction = action;
            } else {
                vm.currentAction = "index";
            }
        };
        vm.templateRendered = function () {

        }
        /********/
    });

    frameVm.$watch("showTree", function () {
        frameVm.resetFrame();
    })
    return frameVm;
});