const url = new URL($request.url);
const path = url.pathname;
const method = ($request.method || "GET").toUpperCase();
const headers = $request.headers || {};

const getHeader = (name) =>
  headers[name] || headers[name.toLowerCase()] || headers[name.toUpperCase()] || "";

const secFetchMode = String(getHeader("sec-fetch-mode")).toLowerCase();
const secFetchDest = String(getHeader("sec-fetch-dest")).toLowerCase();
const secFetchUser = String(getHeader("sec-fetch-user")).toLowerCase();
const accept = String(getHeader("accept")).toLowerCase();

// 1. 只处理 GET
if (method !== "GET") {
  $done({});
}

// 2. 只处理帖子详情页
if (!/^\/r\/[^/]+\/comments\/[^/]+(?:\/[^/]*)?\/?$/.test(path)) {
  $done({});
}

// 3. 已有 tl 不再追加
if (url.searchParams.has("tl")) {
  $done({});
}

// 4. 只处理真正的顶层页面导航请求
if (secFetchMode !== "navigate") {
  $done({});
}

if (secFetchDest !== "document") {
  $done({});
}

if (secFetchUser !== "?1") {
  $done({});
}

// 5. 跳过 Reddit 的 partial / hybrid 页面内请求
if (!accept.includes("text/html")) {
  $done({});
}

if (accept.includes("text/vnd.reddit.partial+html")) {
  $done({});
}

if (accept.includes("text/vnd.reddit.hybrid+html")) {
  $done({});
}

// 6. 追加 tl
url.searchParams.set("tl", "zh-hans");
$done({ url: url.toString() });
