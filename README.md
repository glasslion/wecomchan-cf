# wecomchan-cf

Wecom酱(wecomchan) implemented with Cloudflare worker.

[`index.js`](https://github.com/cloudflare/worker-template/blob/master/index.js) is the content of the Workers script.

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