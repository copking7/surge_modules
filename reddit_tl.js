const TARGET_LANG = "zh-hans";
const FORCE_VALUE = `enabled,seo,${TARGET_LANG}`;

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

function getTLFromURL(urlStr) {
  if (!urlStr) return "";
  try {
    const u = new URL(urlStr);
    return (u.searchParams.get("tl") || "").toLowerCase();
  } catch (e) {
    const m = String(urlStr).match(/[?&]tl=([^&#]+)/i);
    return m ? decodeURIComponent(m[1]).toLowerCase() : "";
  }
}

let headers = $request.headers || {};
const referer = getHeader(headers, "referer") || "";
const reqURL = $request.url || "";

const tlFromReferer = getTLFromURL(referer);
const tlFromReqURL = getTLFromURL(reqURL);

// 优先看 referer，其次看请求自身 url
const currentTL = tlFromReferer || tlFromReqURL;

// 调试日志
console.log("reddit_translate referer =", referer);
console.log("reddit_translate reqURL   =", reqURL);
console.log("reddit_translate tl       =", currentTL || "(empty)");

if (currentTL === TARGET_LANG) {
  setHeader(headers, "x-reddit-translations", FORCE_VALUE);
  console.log("reddit_translate action   = add header");
} else {
  delHeader(headers, "x-reddit-translations");
  console.log("reddit_translate action   = remove header");
}

$done({ headers });
