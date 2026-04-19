const url = new URL($request.url);
if (url.searchParams.has("tl")) {
  $done({});
} else {
  url.searchParams.set("tl", "zh-hans");
  $done({ url: url.toString() });
}
