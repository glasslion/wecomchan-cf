const WE_COM_ACCESS_TOKEN_URL = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken'
const WE_COM_SEND_MSG_URL = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token='

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond
 * @param {Request} request
 */
async function handleRequest (request) {
  let sendKey, msg, toUser
  if (request.method === "GET") {
    const url = new URL(request.url)
    sendKey = url.searchParams.get("sendkey")
    msg = url.searchParams.get("msg")
    toUser = url.searchParams.get("to_user")
  } else {
    const data = await request.json()
    sendKey = data.sendkey
    msg = data.msg
    toUser = data.to_user
  }

  if (toUser === undefined || toUser === null) {
    toUser = "@all"
  }

  try {
    if (sendKey !== SEND_KEY) {
      throw new Error('sendkey 错误')
    }
    const accessToken = await getAccessToken()
    return sendWeComMsg(accessToken, msg, toUser)
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message
      }))
  }
}

async function getAccessToken () {
  const url = `${WE_COM_ACCESS_TOKEN_URL}?corpid=${WECOM_CORPID}&corpsecret=${WECOM_SECRET}`
  const resp = await fetch(url)
  const body = await resp.json()
  const accessToken = body.access_token
  if (accessToken === undefined) {
    throw new Error('获取 accessToken 失败')
  }
  return accessToken
}

async function sendWeComMsg (accessToken, msg, toUser) {
  const url = WE_COM_SEND_MSG_URL + accessToken
  data = {
    "touser": toUser,
    "agentid": WECOM_AGENTID,
    "msgtype": "text",
    "text": {
      "content": msg
    },
    "duplicate_check_interval": 600
  }

  const resp = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return resp
}