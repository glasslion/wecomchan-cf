# wecomchan-cf

通过 Cloudflare Worker 实现的 Wecom酱(Server酱 企业微信版) 

Wecom酱(wecomchan) implemented with Cloudflare worker.

[`index.js`](https://github.com/cloudflare/worker-template/blob/master/index.js) is the content of the Workers script.

## FAQ
1. 本项目 wecomchan-cf 是什么？ 它和 server酱， Wecom酱 关系是什么？

- [Server酱](https://sct.ftqq.com/) 是一个从服务器、路由器等设备上推消息到手机的工具。由于早期免费、上手简单，基于微信推送稳定、不耗电等优点，在码农圈里口碑不错， 用户不少。 
- [Wecom酱](https://github.com/easychen/wecomchan)
- wecomchan-cf

2. 为什么要用 Cloudflare Worker 实现？

首先个人消息推送这种低频 API 调用天生就适合用云函数(Serverless) 实现, 费用低还不用人工运维。实际上 Wecom 酱官方就提供了腾讯云云函数的 实现： https://github.com/easychen/wecomchan/tree/main/go-scf。 

其次，我会用 Cloudflare worker 来实现， 纯粹是因为我个人的强迫症， 希望接口能有一个简洁的域名。 Cloudflare Worker 支持自定义域名， 而腾讯云、阿里云不允许绑定未备案的域名， 只能使用他们提供的一长串随机字符组合成的域名。 同理如果自定义域名不是用的 AWS 的 DNS， AWS Lambda 要绑自定义域名也很困难，也被放弃了


## 配置
在部署迁需要配置以下4个密钥, 密钥的获取可参考 https://github.com/easychen/wecomchan

- WECOM_CORPID
- WECOM_SECRET
- WECOM_AGENTID
- SEND_KEY

配置方式如下:
```
wrangler secret put WECOM_CORPID

...
```

## 部署
```
wrangler publish
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).

## API
API 和[官方](https://github.com/easychen/wecomchan) 一致, 可传递以下3个参数:
- sendkey
- msg
- to_user (不传默认发送给所有用户)

支持 GET 和 POST 两种传参方式。

e.g. 
https://xxxxx/?sendkey=123456&&msg=测试消息&to_user=xxx
