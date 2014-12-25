// avalon 1.3.6
/**
 * @enName searchbar
 * @introduce
 */
define(["avalon", "text!./avalon.searchbar.html", "css!./avalon.searchbar.css", "./avalon.searchcombox.js"], function(avalon, template) {
    /**
    *   templateArr = template.split('MS_OPTION_EJS');
    */
    var count = 0, order = {};

    function getCnt(){
        return count++;
    }

    var widget = avalon.ui.searchbar = function (element, data, vmodels) {
        var options = data.searchbarOptions,
        $element = avalon(element),
        vmId = data.searchbarId;
        options.template = options.getTemplate(template, options);

        var inited, id = +(new Date());

        var vm = avalon.mix({
            $id : vmId,
            widgetElement : element,
            alterWraper: null,
            selectedWraper: null,
            $skipArray : ["widgetElement", "template", "alterWraper", "selectedWraper"],
            $uid : id,
            selectedItems:[],
            containerWidth:0,
            removeSelectedItem: function (itemLabel) {
                for(var i = 0; i < vmodel.selectedItems.length; i++){
                    if(vmodel.selectedItems[i].label == itemLabel){
                        vmodel.selectedItems.splice(i, 1);
                    }
                }
            },
            $init :  function (continueScan) {
                if (inited) return;
                inited = true;
                vmodel.template = vmodel.template.replace(/\{\{MS_COMBOX_ID\}\}/g, id);
                element.innerHTML = vmodel.template;

                vmodel.alterWraper = element.children[0].children[0].children[1];
                vmodel.selectedWraper = element.children[0].children[1].children[1];

                renderAlterItems();

                vmodel.alterLabel += "：";
                vmodel.selectedLabel += "：";

                vmodel.containerWidth = element.offsetWidth - 70;

                if (continueScan) {
                    continueScan();
                }
            }
        }, options);

        for(var i = 0;  i < vm.searchItems.length; i++){
            (function(){
                var item = vm.searchItems[i];
                order[item.label] =  i;
                var nickName =  "$searchitem" + getCnt();
                vm.searchItems[i].nickName = nickName;
                vm[nickName] = vm.searchItems[i];
                vm[nickName].afterSelect = function (value, text) {
                    var selectedItem = {label:item.label, value:value, text:text, closable:item.closable?true:false};
                    addSelectedItem(selectedItem);
                }
            })();

        }

        var vmodel = avalon.define(vm);

        function addSelectedItem(selectedItem){
            var existIndex = -1;
            for(var i = 0; i < vmodel.selectedItems.length; i++){
                if( vmodel.selectedItems[i].label == selectedItem.label){
                    vmodel.selectedItems.splice(i, 1);
                    break;
                }
            }

            vmodel.selectedItems.push(selectedItem);
            orderSelectedItem();
        }

        function orderSelectedItem(){
            vmodel.selectedItems.sort(function (a, b) {
               if(order[a.label] > order[b.label])
                   return 1;
                else if(order[a.label] == order[b.label])
                    return 0;
                else
                    return -1;

            });
        }
        function renderAlterItems(){
            for(var i = 0; i < vmodel.searchItems.length; i++){
                var item = vmodel.searchItems[i];
                var itemDom = document.createElement("div");
                var nick = item.nickName;
                itemDom.setAttribute("ms-widget", "search"+item.type+","+nick+","+nick);
                itemDom.setAttribute("class", "oni-searchbar-item");
                vmodel.alterWraper.appendChild(itemDom);
            }
        }

        return vmodel;
    };

    widget.defaults = {
        searchItems:[{type:'combox', label:'院系', dataType:'local', closable:true,localData:[{value:'1', text:'one'}, {value:'2', text:'two'}]}, {type:'combox', label:'专业',  dataType:'local',localData:[{value:'1', text:'one'}, {value:'2', text:'two'}]}, {type:'combox', label:'班级',  dataType:'local',localData:[{value:'1', text:'one'}, {value:'2', text:'two'}]}],
        alterLabel:'待选条件',
        selectedLabel:'已选条件',
        getTemplate: function (str, options) {
            return str;
        }
    };

    return avalon;
});

/**
  //遍历数组元素，依次处理
  [].forEach(function (dataItem, index) {
      if (dataItem.selected) {
          selectedData.push(dataItem);
      }
  });

  //监听view model中属性的变化
  vmodel.$watch("scrollerHeight", function(n) {

  //解析字符串模板为dom对象
  var dom = avalon.parseHTML(options.template);
  });

  //组件嵌套时 外部组件向内部组件传值
  var duplexVM = avalon.getModel(options.duplex, [vmodel].concat(vmodels)),
  duplexArr = duplexVM && duplexVM[1][duplexVM[0]]

   //新建dom元素
   popup = popup || document.createElement("div");
   popup.innerHTML = options.template;
   document.body.appendChild(popup)
*/
