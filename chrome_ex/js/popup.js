$(function () {
    $("#btnCopy").click(function () {
        // chrome.tabs.query可以通过回调函数获得当前页面的信息tabs
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // 发送一个copy消息出去
            chrome.tabs.sendMessage(tabs[0].id, { action: "copy" }, function (response) {
                // 这里的回调函数接收到了要抓取的值，获取值得操作在下方content-script.js
                // 将值存在background.js的data属性里面。
                var win = chrome.extension.getBackgroundPage();
                win.data=response;
            });  
        }); 
    });

    $("#btnPaste").click(function () {
       // 将之前抓取到的并保存的data数据从background.js取出
        var win = chrome.extension.getBackgroundPage();
        if (win.data) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                // 将之前抓取的数据发送
                chrome.tabs.sendMessage(tabs[0].id, { action: "paste", data: win.data }, function (response) {
                    console.log(response);
                });
            }); 
        }
    });
});