/**
 * Created by JJ on 2014/12/18.
 */
define("sys/role/index", ["global"], function (g) {
    var indexVM = avalon.define("sys/role/index", function (vm) {
        vm.treeTitle = "aaa";
        vm.date = new Date();
        vm.$array = [];
        vm.init = function () {
            //alert("init");
            g.showTree = true;
            g.contentTemplate = "jot/sys/role/role.html";
            vm.treeTitle = "aaaaaaaa";
            vm.date = new Date();
            var array = [];
            for(var i=0;i<100;i++){
                array.push({id:i, title: 't2'})
            }
            vm.$array = array;
        }
    });
    return indexVM;
});