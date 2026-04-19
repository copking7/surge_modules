const url = new URL($request.url);
const path = url.pathname;
const method = ($request.method || "GET").toUpperCase();
const headers = $request.headers || {};

// 只处理 GET
if (method !== "GET") {
  $done({});
  return;
}

// 只处理帖子详情页
if (!/^\/r\/[^/]+\/comments\/[^/]+(?:\/[^/]*)?\/?$/.test(path)) {
  $done({});
  return;
}

// 已有 tl 参数就不再追加(防止 302 循环)
if (url.searchParams.has("tl")) {
  $done({});
  return;
}

// 只在"主文档导航"时动手,partial / xhr / fetch / iframe 一律放过
const secFetchMode = (headers["sec-fetch-mode"] || headers["Sec-Fetch-Mode"] || "").toLowerCase();
const secFetchDest = (headers["sec-fetch-dest"] || headers["Sec-Fetch-Dest"] || "").toLowerCase();

// 收紧判定:必须是 navigate + document 才改
if (secFetchMode && secFetchMode !== "navigate") {
  $done({});
  return;
}
if (secFetchDest && secFetchDest !== "document") {
  $done({});
  return;
}

// 用 302 让浏览器自己跳,而不是 Surge 内部 replay
url.searchParams.set("tl", "zh-hans");
$done({
  response: {
    status: 302,
    headers: {
      Location: url.toString()
    }
  }
});
