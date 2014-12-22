// avalon 1.3.6
/**
 * @enName searchcombox
 * @introduce
 */
define(["avalon", "text!./avalon.searchcombox.html","avalon.getModel", "css!./avalon.searchcombox.css"], function (avalon, template) {
    /**
     *   templateArr = template.split('MS_OPTION_EJS');
     */
    var widget = avalon.ui.searchcombox = function (element, data, vmodels) {
        var options = data.searchcomboxOptions,
            $element = avalon(element),
            vmId = data.searchcomboxId;
        options.template = options.getTemplate(template, options);
        avalon.panels = avalon.panels || [];

        var inited, id = +(new Date());

        var vm = avalon.mix({
            $id: vmId,
            widgetElement: element,
            $skipArray: ["widgetElement", "template"],
            $uid: id,
            left:0,
            top:0,
            data:[],
            panelVisible:false,
            keyword:"",
            fixPanelHidden : function (e) {
                e.stopPropagation();
            },
            selectItem: function (ele, text) {
                var value = avalon(ele.parentNode).data("value");
                vmodel.afterSelect(value, text);
            },
            reloadListByKeyword: function (ele) {
                vmodel.keyword = ele.value;
                setData();
            },
            hidePanel : function () {
                vmodel.panelVisible = false;
            },
            showPanel: function (e) {
                vmodel.left = vmodel.wrapElement.offsetLeft;
                vmodel.top = vmodel.wrapElement.offsetTop+vmodel.wrapElement.offsetHeight;
                hideAllPanel();
                vmodel.panelVisible = !vmodel.panelVisible;
                if(vmodel.panelVisible){
                    setData();
                }
                e.stopPropagation();
            },
            $init: function (continueScan) {
                if (inited) return;
                inited = true;
                vmodel.template = vmodel.template.replace(/\{\{MS_COMBOX_ID\}\}/g, id);
                element.innerHTML = vmodel.template;
                vmodel.panelElement = element.children[1];
                vmodel.wrapElement = element.children[0];
                avalon.panels.push(vmodel);
                if (continueScan) {
                    continueScan();
                }
            }
        }, options);

        var vmodel = avalon.define(vm);

        function setData(){
            var keyword = vmodel.keyword;
            if(vmodel.dataType == 'local'){
                if(keyword == "" || !keyword){
                    vmodel.data = vmodel.localData;
                }else{
                    vmodel.data.splice(0,vmodel.data.length);
                    for(var i = 0; i < vmodel.localData.length; i++){
                        if(vmodel.localData[i].text.indexOf(keyword)>0){
                            vmodel.data.push(vmodel.localData[i]);
                        }
                    }
                }

            }else if(vmodel.dataType == "server"){
                if(keyword == "" || !keyword){

                }else{

                }
            }
        }

        avalon(document).bind("click", function () {
            vmodel.panelVisible = false;
        })

        function hideAllPanel(){
            for(var i = 0; i < avalon.panels.length; i++){
                avalon.panels[i].hidePanel();
            }
        }
        return vmodel;
    };

    widget.defaults = {
        /**
         * width: 下拉面板宽度
         * */
        width: '150',
        /**
         * label： 名称
         * */
        label:'label',
        pageable: true,
        pageSize: 10,
        /**
         * afterSelect: 单击选择后触发的事件
         * */
        afterSelect: avalon.noop(),
        /**
         * dataType:数据来源类型
         * local:本地数据; server:服务器数据
         * */
        dataType: 'local',
        /**
         * localData:本地数据
         * {value:'1', text:''}
         * */
        localData: [{value:1, text:'选项1'}, {value:2, text:'选项2'}],
        /**
         * 远程数据url
         * */
        url:'',
        /**
         * multi:是否支持多选
         * */
        multi: false,
        placeHolder:'搜索...',
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
