//监听消息
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "copy") {
    //收到copy信息，开始获取当前页面id为sb_form_q的值
            var ctrl = $("#sb_form_q");
            if (ctrl.length > 0) {
            // 如果获取的值不为空则返回数据到popup.js的回调函数
                if (sendResponse) sendResponse(ctrl.val());
            } else {
                alert("No data");
            }
        } else if (request.action === "paste") {
            // 收到paste消息和之前抓取的值
            var ctrl = $("#input");
            if (ctrl.length > 0) {
            // 将值放入目标网页的id为input的输入框中
                ctrl.val(request.data);
                sendResponse("OK");
            } else {
                alert("No data");
            }
        }
    }
);