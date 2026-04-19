#!name=Reddit 网页翻译参数
#!desc=为 Reddit 网页请求翻译
#!category=reddit

[General]
force-http-engine-hosts = %APPEND% www.reddit.com

[MITM]
hostname = %APPEND%, www.reddit.com

[URL Rewrite]
# 没有 query 参数时，追加 ?tl=zh-hans
^https:\/\/www\.reddit\.com\/([^?]+)$ https://www.reddit.com/$1?tl=zh-hans 302

# 已有 query 参数但没有 tl= 时，追加 &tl=zh-hans
^https:\/\/www\.reddit\.com\/([^?]+)\?((?!.*(?:^|&)tl=).*)$ https://www.reddit.com/$1?$2&tl=zh-hans 302
