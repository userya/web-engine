/**
 * Created by JJ on 2014/12/18.
 */
define("sys/account/index", ["global","smartgrid/avalon.smartgrid", "jotGrid/jotGrid", "searchbar/avalon.searchbar"], function (g) {

    function getDatas(number) {
        var data = []
        for (var i = 0; i < number; i++) {
            data.push({
                name: "shirly" + i,
                age: parseInt(10 + Math.random() * 20),
                selected: i % 3 ? false : true,
                salary: parseInt(Math.random() * 100),
                operate: i % 5 ? 0 : 1,
                busy: !i % 3 && !i % 5 ? 0 : 1
            })
        }
        return data
    }



    var indexVM = avalon.define("sys/account/index", function (vm) {
        vm.$skipArray =  ["smartgrid"];
        vm.smartgrid = {};
        vm.$opts = {
            name:"sssssssssss"
        }
        vm.init = function () {
            //alert("init");
            //g.showTree = false;
            g.contentTemplate = "jot/sys/account/account.html";
            vm.smartgrid = {
                columns: [
                    {
                        key: "name", //列标识
                        name: "姓名", //列名
                        sortable: true, //是否可排序
                        isLock: true, //是否锁死列让其始终显示
                        align: "left", //列的对象方式
                        defaultValue: "shirly", //列的默认值
                        customClass: "ddd", //自定义此列单元格类
                        toggle: false, //控制列的显示隐藏
                        width: 200 //设置列的宽度
                    }, {
                        key: "age",
                        name: "年龄",
                        sortable: true,
                        width: 300
                    }, {
                        key: "salary",
                        name: "薪水",
                        type: "Number",
                        sortable: true,
                        align: "right",
                        width: 300
                    }
                ],
                data: getDatas(15)
            }
        }
    });
    return indexVM;
});