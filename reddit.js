#!name=Reddit 网页翻译参数
#!desc=仅为 Reddit 帖子页的外部顶层导航追加 tl=zh-hans
#!category=reddit

[General]
force-http-engine-hosts = %APPEND% www.reddit.com

[MITM]
hostname = %APPEND%, www.reddit.com

[Script]
reddit-tl = type=http-request,pattern=^https:\/\/www\.reddit\.com\/r\/[^\/]+\/comments\/[^\/]+,requires-body=0,script-path=https://raw.githubusercontent.com/copking7/surge_modules/main/reddit_tl.js
