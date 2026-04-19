const url = new URL($request.url);
const path = url.pathname;
const method = ($request.method || "GET").toUpperCase();
const headers = $request.headers || {};

if (method !== "GET") { $done({}); return; }

// 只处理帖子详情页
if (!/^\/r\/[^/]+\/comments\/[^/]+(?:\/[^/]*)?\/?$/.test(path)) {
  $done({}); return;
}

// 已有 tl 不动
if (url.searchParams.has("tl")) { $done({}); return; }

// 必须是真正的文档导航
const mode = (headers["sec-fetch-mode"] || headers["Sec-Fetch-Mode"] || "").toLowerCase();
const dest = (headers["sec-fetch-dest"] || headers["Sec-Fetch-Dest"] || "").toLowerCase();
if (mode && mode !== "navigate") { $done({}); return; }
if (dest && dest !== "document") { $done({}); return; }

// 只在跨站进入(Google 等)时注入,站内点击走 Reddit 自己的 SPA,避免抢路由
const site = (headers["sec-fetch-site"] || headers["Sec-Fetch-Site"] || "").toLowerCase();
if (site && site !== "cross-site" && site !== "none") { $done({}); return; }

url.searchParams.set("tl", "zh-hans");
$done({
  response: {
    status: 302,
    headers: { Location: url.toString() }
  }
});
