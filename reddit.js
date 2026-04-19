#!name=Reddit 网页翻译参数
#!desc=为 Reddit 网页请求自动翻译
#!category=reddit

[General]
force-http-engine-hosts = %APPEND% reddit.com, www.reddit.com

[MITM]
hostname = %APPEND%, reddit.com, www.reddit.com

[Script]
reddit-tl = type=http-request,pattern=^https:\/\/(www\.)?reddit\.com\/,requires-body=0,script-path=https://raw.githubusercontent.com/copking7/surge_modules/refs/heads/main/reddit_tl.js
