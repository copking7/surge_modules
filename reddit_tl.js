const url = new URL($request.url);
const path = url.pathname;
const method = ($request.method || "GET").toUpperCase();
const headers = $request.headers || {};

function h(name) {
  return String(
    headers[name] ??
    headers[name.toLowerCase()] ??
    headers[name.toUpperCase()] ??
    ""
  ).toLowerCase();
}

const accept = h("accept");
const secFetchMode = h("sec-fetch-mode");
const secFetchDest = h("sec-fetch-dest");
const secFetchUser = h("sec-fetch-user");
const secFetchSite = h("sec-fetch-site");
const referer = h("referer");

// 只处理 GET
if (method !== "GET") {
  $done({});
}

// 只处理帖子页
if (!/^\/r\/[^/]+\/comments\/[^/]+(?:\/[^/]*)?\/?$/.test(path)) {
  $done({});
}

// 已有 tl 就不加
if (url.searchParams.has("tl")) {
  $done({});
}

// 必须是外部顶层导航
if (secFetchSite !== "cross-site") {
  $done({});
}
if (secFetchMode !== "navigate") {
  $done({});
}
if (secFetchDest !== "document") {
  $done({});
}
if (secFetchUser !== "?1") {
  $done({});
}

// 必须是标准整页 HTML 请求
if (!accept.includes("text/html")) {
  $done({});
}
if (accept.includes("text/vnd.reddit.partial+html")) {
  $done({});
}
if (accept.includes("text/vnd.reddit.hybrid+html")) {
  $done({});
}

// 可选：要求 referer 不是 reddit 自己
if (referer.includes("reddit.com")) {
  $done({});
}

url.searchParams.set("tl", "zh-hans");
$done({ url: url.toString() });
