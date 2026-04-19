#!name=Reddit 网页翻译参数
#!desc=仅为 Reddit页面路由翻译
#!category=reddit

[General]
force-http-engine-hosts = %APPEND% www.reddit.com

[MITM]
hostname = %APPEND%, www.reddit.com

[Script]
reddit-tl = type=http-request,pattern=^https:\/\/www\.reddit\.com\/r\/,requires-body=0,script-path=https://raw.githubusercontent.com/copking7/surge_modules/main/reddit_tl.js
