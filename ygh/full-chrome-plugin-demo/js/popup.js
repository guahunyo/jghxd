$(function () {

	// 加载设置
	var defaultConfig = { color: 'white' }; // 默认配置
	chrome.storage.sync.get(defaultConfig, function (items) {
		document.body.style.backgroundColor = items.color;
	});

	// 初始化国际化
	$('#test_i18n').html(chrome.i18n.getMessage("helloWorld"));


});

// 打开后台页
$('#open_background').click(e => {
	window.open(chrome.extension.getURL('background.html'));
});

// 调用后台JS
$('#invoke_background_js').click(e => {
	var bg = chrome.extension.getBackgroundPage();
	bg.testBackground();
});

// 最大化窗口
$('#max_current_window').click(() => {
	chrome.windows.getCurrent({}, (currentWindow) => {
		chrome.windows.update(currentWindow.id, { state: 'maximized' });
	});
});

// 最小化窗口
$('#min_current_window').click(() => {
	chrome.windows.getCurrent({}, (currentWindow) => {
		chrome.windows.update(currentWindow.id, { state: 'minimized' });
	});
});

// 最小化窗口
$('#full_current_window').click(() => {
	chrome.windows.getCurrent({}, (currentWindow) => {
		chrome.windows.update(currentWindow.id, { state: 'fullscreen' });
	});
});

// 打开新窗口
$('#open_new_window').click(() => {
	chrome.windows.create({ state: 'maximized' });
});

// 关闭全部
$('#close_current_window').click(() => {
	chrome.windows.getCurrent({}, (currentWindow) => {
		chrome.windows.remove(currentWindow.id);
	});
});

// 新标签打开网页
$('#open_url_new_tab').click(() => {
	chrome.tabs.create({ url: 'https://www.baidu.com' });
});

// 新标签打开外服云顶数据
$('#open_url_new_tab_tft').click(() => {
	chrome.tabs.create({ url: 'https://tftactics.gg/meta-report' });
});

// 新标签打开国服云顶数据
$('#open_url_new_tab_yd').click(() => {
	chrome.tabs.create({ url: 'https://lol.qq.com/tft/#/rank/list' });
});

// 新标签打开所有搜图网站
$('#open_url_new_tab_search_img').click(() => {
	chrome.tabs.create({ url: 'https://www.google.com/imghp?hl=zh-CN' }); // 谷歌识图
  chrome.tabs.create({ url: 'https://image.baidu.com/?fr=shitu' }); // 百度识图
  chrome.tabs.create({ url: 'https://pic.sogou.com/' }); // 搜狗识图
  chrome.tabs.create({ url: 'https://image.so.com/' }); // 360识图
  chrome.tabs.create({ url: 'https://tineye.com/' }); // tineye
  chrome.tabs.create({ url: 'https://saucenao.com/' }); // saucenao
  chrome.tabs.create({ url: 'https://cn.bing.com/visualsearch' }); // 必应识图
  chrome.tabs.create({ url: 'https://yandex.com/images/' }); // yandex
});

// 当前标签打开网页
$('#open_url_current_tab').click(() => {
	getCurrentTabId(tabId => {
		chrome.tabs.update(tabId, { url: 'http://www.so.com' });
	});
});

// 获取当前标签ID
$('#get_current_tab_id').click(() => {
	getCurrentTabId(tabId => {
		alert('当前标签ID：' + tabId);
	});
});

// 高亮tab
$('#highlight_tab').click(() => {
	chrome.tabs.highlight({ tabs: 0 });
});

// popup主动发消息给content-script
$('#send_message_to_content_script').click(() => {
	sendMessageToContentScript('你好，我是popup！', (response) => {
		if (response) alert('收到来自content-script的回复：' + response);
	});
});

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	sendResponse('我是popup，我已收到你的消息：' + JSON.stringify(request));
});

// popup与content-script建立长连接
$('#connect_to_content_script').click(() => {
	getCurrentTabId((tabId) => {
		var port = chrome.tabs.connect(tabId, { name: 'test-connect' });
		port.postMessage({ question: '你是谁啊？' });
		port.onMessage.addListener(function (msg) {
			alert('收到长连接消息：' + msg.answer);
			if (msg.answer && msg.answer.startsWith('我是')) {
				port.postMessage({ question: '哦，原来是你啊！' });
			}
		});
	});
});

// 获取当前选项卡ID
function getCurrentTabId(callback) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (callback) callback(tabs.length ? tabs[0].id : null);
	});
}

// 这2个获取当前选项卡id的方法大部分时候效果都一致，只有少部分时候会不一样
function getCurrentTabId2() {
	chrome.windows.getCurrent(function (currentWindow) {
		chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (tabs) {
			if (callback) callback(tabs.length ? tabs[0].id : null);
		});
	});
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
	getCurrentTabId((tabId) => {
		chrome.tabs.sendMessage(tabId, message, function (response) {
			if (callback) callback(response);
		});
	});
}

// 向content-script注入JS片段
function executeScriptToCurrentTab(code) {
	getCurrentTabId((tabId) => {
		chrome.tabs.executeScript(tabId, { code: code });
	});
}


// 演示2种方式操作DOM

// 修改背景色
$('#update_bg_color').click(() => {
	executeScriptToCurrentTab('document.body.style.backgroundColor="red";')
});

// 修改字体大小
$('#update_font_size').click(() => {
	sendMessageToContentScript({ cmd: 'update_font_size', size: 42 }, function (response) { });
});

// 显示badge
$('#show_badge').click(() => {
	chrome.browserAction.setBadgeText({ text: 'New' });
	chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
});

// 隐藏badge
$('#hide_badge').click(() => {
	chrome.browserAction.setBadgeText({ text: '' });
	chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
});

// 显示桌面通知
$('#show_notification').click(e => {
	chrome.notifications.create(null, {
		type: 'image',
		iconUrl: 'img/icon.png',
		title: '祝福',
		message: '骚年，祝你圣诞快乐！Merry christmas!',
		imageUrl: 'img/sds.png'
	});
});

$('#check_media').click(e => {
	alert('即将打开一个有视频的网站，届时将自动检测是否存在视频！');
	chrome.tabs.create({ url: 'http://www.w3school.com.cn/tiy/t.asp?f=html5_video' });
});