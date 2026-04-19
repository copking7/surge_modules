#!name=Reddit 网页翻译参数
#!desc=访问 Reddit 网页时自动追加 tl=zh-hans
#!category=reddit

[URL Rewrite]
^https:\/\/www\.reddit\.com\/([^?]+)$ https://www.reddit.com/$1?tl=zh-hans 302
^https:\/\/www\.reddit\.com\/([^?]+)\?((?!.*(?:^|&)tl=).*)$ https://www.reddit.com/$1?$2&tl=zh-hans 302
