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

// 1) 只处理 GET
if (method !== "GET") {
  $done({});
}

// 2) 只处理帖子详情页
if (!/^\/r\/[^/]+\/comments\/[^/]+(?:\/[^/]*)?\/?$/.test(path)) {
  $done({});
}

// 3) 已有 tl 就不再追加
if (url.searchParams.has("tl")) {
  $done({});
}

// 4) 必须是顶层页面导航
if (secFetchMode !== "navigate") {
  $done({});
}

if (secFetchDest !== "document") {
  $done({});
}

if (secFetchUser !== "?1") {
  $done({});
}

// 5) 必须是标准 HTML 文档请求，不是 partial / hybrid
if (!accept.includes("text/html")) {
  $done({});
}

if (accept.includes("text/vnd.reddit.partial+html")) {
  $done({});
}

if (accept.includes("text/vnd.reddit.hybrid+html")) {
  $done({});
}

// 6) same-origin 的站内前端导航也跳过，只处理更像“手动打开”的请求
if (secFetchSite === "same-origin") {
  $done({});
}

// 7) 追加 tl
url.searchParams.set("tl", "zh-hans");
$done({ url: url.toString() });
