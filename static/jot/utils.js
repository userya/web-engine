define("utils", function(){

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

    return {
        getFrameInfo:getFrameInfo
    }

})