const STORE_KEY = "reddit_translation_mode";
const FORCE_VALUE = "enabled,seo,zh-hans";

function findHeaderKey(headers, name) {
  const lower = name.toLowerCase();
  return Object.keys(headers || {}).find(k => k.toLowerCase() === lower);
}

function getHeader(headers, name) {
  const key = findHeaderKey(headers, name);
  return key ? headers[key] : null;
}

function setHeader(headers, name, value) {
  const key = findHeaderKey(headers, name);
  if (key) {
    headers[key] = value;
  } else {
    headers[name] = value;
  }
}

function delHeader(headers, name) {
  const key = findHeaderKey(headers, name);
  if (key) delete headers[key];
}

let headers = $request.headers || {};
const incoming = getHeader(headers, "x-reddit-translations");

// 1. 如果客户端/网页这次自己明确带了值，优先尊重它
if (incoming !== null && incoming !== undefined) {
  const v = String(incoming).trim().toLowerCase();

  // 这里先按“包含 enabled 就视为开”处理
  // 如果你抓包后发现 Reddit 关闭态是某个固定字符串，再精确改这里
  if (v.includes("enabled")) {
    $persistentStore.write("on", STORE_KEY);
  } else {
    $persistentStore.write("off", STORE_KEY);
  }

  $done({ headers });
  return;
}

// 2. 没有显式头时，按本地持久化状态决定
const mode = $persistentStore.read(STORE_KEY) || "on";

if (mode === "on") {
  setHeader(headers, "x-reddit-translations", FORCE_VALUE);
} else {
  delHeader(headers, "x-reddit-translations");
}

$done({ headers });
