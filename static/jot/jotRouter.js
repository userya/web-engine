/**
 * Created by JJ on 2014/12/15.
 */
define("jotRouter", ["jotMenu", "global", "mmRouter"], function (menu, global) {


    function callback() {
        var params = this.params;
        var appId = params.appId;
        if (!appId) {
            appId = menu.firstAppId;
        }
        global.query = this.query;
        var moduleId = params.moduleId;
        var actionId = params.action;
        if (!moduleId) {
            global.selectApp(appId);
        } else {
            global.selectModule(appId, moduleId, actionId);
        }

        require(global.getPath(), function(ctrl){
            global.showTree = false;
            //global.treeTemplate = null;
            //global.contentTemplate = "blank.html";
            //jQuery("#contentTemplateDiv").empty();
            //jQuery("#treeTemplateDiv").empty();
            ctrl.init();
        });

    }

    avalon.router.get("/:appId", callback);
    avalon.router.get("/:appId/:moduleId", callback);
    avalon.router.get("/:appId/:moduleId/:action", callback);

});