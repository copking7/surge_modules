const url = new URL($request.url);
const path = url.pathname;
const method = ($request.method || "GET").toUpperCase();

// 只处理 GET
if (method !== "GET") {
  $done({});
}

// 只处理 subreddit 首页
const isSubreddit = /^\/r\/[^/]+\/?$/.test(path);

// 只处理帖子详情页
const isPost = /^\/r\/[^/]+\/comments\/[^/]+(?:\/[^/]*)?\/?$/.test(path);

// 其它页面一律不处理
if (!isSubreddit && !isPost) {
  $done({});
}

// 已经带 tl 参数就不再追加
if (url.searchParams.has("tl")) {
  $done({});
}

url.searchParams.set("tl", "zh-hans");
$done({ url: url.toString() });
