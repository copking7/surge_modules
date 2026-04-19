#!name=Reddit 自动翻译
#!desc=为 Reddit 强制开启翻译
#!category=reddit

[General]
force-http-engine-hosts = %APPEND% gql-fed.reddit.com

[MITM]
hostname = %APPEND%, gql-fed.reddit.com

[Header Rewrite]
^https:\/\/gql-fed\.reddit\.com header-del x-reddit-translations
^https:\/\/gql-fed\.reddit\.com header-add x-reddit-translations "enabled,seo,zh-hans"
