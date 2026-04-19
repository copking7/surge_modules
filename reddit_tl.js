const url = new URL($request.url);
const path = url.pathname;
const method = ($request.method || "GET").toUpperCase();
const headers = $request.headers || {};

// 只处理 GET
if (method !== "GET") {
  $done({});
}

// 只处理帖子详情页
if (!/^\/r\/[^/]+\/comments\/[^/]+(?:\/[^/]*)?\/?$/.test(path)) {
  $done({});
}

// 已有 tl 参数就不再追加
if (url.searchParams.has("tl")) {
  $done({});
}

// 跳过 Reddit 前端内部的同源异步请求
const secFetchMode = (headers["sec-fetch-mode"] || headers["Sec-Fetch-Mode"] || "").toLowerCase();
const secFetchDest = (headers["sec-fetch-dest"] || headers["Sec-Fetch-Dest"] || "").toLowerCase();

if (secFetchMode === "cors" && secFetchDest === "empty") {
  $done({});
}

url.searchParams.set("tl", "zh-hans");
$done({ url: url.toString() });
