/**
 * 菜单操作
 */
define("jotMenu", ["text!../menu.json"], function (menuDataString) {
    var menuData = avalon.parseJSON(menuDataString);
    var apps = {};
    var firstAppId = null;
    var firstModuleId = null;
    var firstModules = null;
    for (var i = 0; i < menuData.length; i++) {
        var app = menuData[i];
        apps[app.id] = app;
        if (app.modules) {
            for (var j = 0; j < app.modules.length; j++) {
                var m1 = app.modules[j];//level 1
                m1.appId = app.id;
                if (m1 && m1.modules && m1.modules.length > 0) {
                    m1.hasModule = true;
                    for (var k = 0; k < m1.modules.length; k++) {
                        var kkk = m1.modules[k];
                        kkk.appId = app.id;
                    }
                } else {
                    if (m1) {
                        m1.hasModule = false;
                    }
                }
            }
        }
        if (i == 0) {
            firstAppId = app.id;
            firstModules = app.modules;
            if (app.modules.length > 0) {
                firstModuleId = app.modules[0].id;
                if (app.modules[0].modules && app.modules[0].modules.length > 0) {
                    firstModuleId = app.modules[0].modules[0].id;
                }
            }
        }
    }
    var fcopy = [];
    jQuery.extend(fcopy, firstModules);
    firstModules = fcopy;

    function getFirstModuleId(app) {
        firstAppId = app.id;
        firstModules = app.modules;
        if (app.modules.length > 0) {
            firstModuleId = app.modules[0].id;
            if (app.modules[0].modules && app.modules[0].modules.length > 0) {
                firstModuleId = app.modules[0].modules[0].id;
            }
        }
    }

    return {
        menuData: menuData,
        firstAppId: firstAppId,
        firstModuleId: firstModuleId,
        firstModules: firstModules,
        apps: apps,
        findAppById: function (id) {
            return this.apps[id];
        },
        findModulesByAppId: function (id) {
            var mds = this.findAppById(id).modules;
            var copy = [];
            jQuery.extend(copy, mds);
            return copy;
        },
        findFirstModuleByAppId: function (id) {
            var app = this.findAppById(id);
            var firstModuleId = null;
            if (app.modules.length > 0) {
                firstModuleId = app.modules[0].id;
                if (app.modules[0].modules && app.modules[0].modules.length > 0) {
                    firstModuleId = app.modules[0].modules[0].id;
                }
            }
            return firstModuleId;
        }
    };
});