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

// 如果这次请求本身就带了 x-reddit-translations
if (incoming !== null && incoming !== undefined) {
  const v = String(incoming).trim().toLowerCase();

  // 这里先按“包含 enabled 就视为开启”处理
  if (v.includes("enabled")) {
    $persistentStore.write("on", STORE_KEY);
  } else {
    $persistentStore.write("off", STORE_KEY);
  }

  $done({ headers });
} else {
  // 如果请求本身没带头，就按本地保存状态决定
  const mode = $persistentStore.read(STORE_KEY) || "on";

  if (mode === "on") {
    setHeader(headers, "x-reddit-translations", FORCE_VALUE);
  } else {
    delHeader(headers, "x-reddit-translations");
  }

  $done({ headers });
}
