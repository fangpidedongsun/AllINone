/*app.mixcapp.com

[rewrite_local]

^https:\/\/app.mixcapp.com\/mixc\/api\/v6\/homepage url script-request-header mcdd.cookie.js

^https:\/\/app.mixcapp.com\/mixc\/api\/v2\/member\/sign\/index
Regex: ^https:\/\/app.mixcapp.com\/mixc\/api\/v6\/homepage
Host: app.mixcapp.com
*/
const  appName = '万象汇'
const  chavy = init()
const  URL = chavy.getdata("UrlFC")
const  KEY = chavy.getdata("CookieFC")

let isGetCookie = typeof $request !== 'undefined'

if (isGetCookie) {
   getcookie()
} else {
   takePrize()
}

function getcookie() {
  const url = $request.url;
  if (url) {
     const UrlKeyFC = "UrlFC";
     const UrlValueFC = url;
     if (chavy.getdata(UrlKeyFC) != (undefined || null)) {
        if (chavy.getdata(UrlKeyFC) != UrlValueFC) {
           const url = chavy.setdata(UrlValueFC, UrlKeyFC);
           if (!url) {
              chavy.msg("更新" + appName + "Url失败‼️", "", "");
              } else {
              chavy.msg("更新" + appName + "Url成功🎉", "", "");
              }
           } else {
           chavy.msg(appName + "Url未变化❗️", "", "");
           }
        } else {
        const url = chavy.setdata(UrlValueFC, UrlKeyFC);
        if (!url) {
           chavy.msg("首次写入" + appName + "Url失败‼️", "", "");
           } else {
           chavy.msg("首次写入" + appName + "Url成功🎉", "", "");
           }
        }
     } else {
     chavy.msg("写入" + appName + "Url失败‼️", "", "配置错误, 无法读取URL, ");
     }
  if ($request.headers) {
     const CookieKeyFC = "CookieFC";
     const CookieValueFC = JSON.stringify($request.headers);
     if (chavy.getdata(CookieKeyFC) != (undefined || null)) {
        if (chavy.getdata(CookieKeyFC) != CookieValueFC) {
           const cookie = chavy.setdata(CookieValueFC, CookieKeyFC);
           if (!cookie) {
              chavy.msg("更新" + appName + "Cookie失败‼️", "", "");
              } else {
              chavy.msg("更新" + appName + "Cookie成功🎉", "", "");
              }
           } else {
           chavy.msg(appName + "Cookie未变化❗️", "", "");
           }
        } else {
        const cookie = chavy.setdata(CookieValueFC, CookieKeyFC);
        if (!cookie) {
           chavy.msg("首次写入" + appName + "Cookie失败‼️", "", "");
           } else {
           chavy.msg("首次写入" + appName + "Cookie成功🎉", "", "");
           }
        }
     } else {
     chavy.msg("写入" + appName + "Cookie失败‼️", "", "配置错误, 无法读取请求头, ");
     }
  chavy.done()
}

    function takePrize() {
        return new Promise((resolve) => {
        setTimeout( ()=>{
    	let url = {
    	url: `https://app.mixcapp.com/mixc/api/v2/member/sign/index`,
        body : body,
        headers: {
    	  'Cookie' : KEY,
    	  'X-Requested-With' : `XMLHttpRequest`,
    	  'Accept' : `application/json, text/javascript, */*; q=0.01`,
    	  'Origin' : `https://app.mixcapp.com`,
    	  'Accept-Encoding' : `gzip, deflate, br`,
    	  'Content-Type' : `application/x-www-form-urlencoded;charset=UTF-8`,
    	  'Host' : `app.mixcapp.com`,
    	  'Connection' : `keep-alive`,
    	  'Referer' : `https://app.mixcapp.com/h5/mixctime/templets/sign.html`,
    	  'Accept-Language' : `zh-cn`
        }
      }
        $.post(url, (err, resp, data) => {
          try {
            data = JSON.parse(data);
            $.Prize[PrizeName] = data;
    		$.Prize[PrizeName].Desc = Desc;
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve()
          }
        })
        },timeout)
      })
    }



function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  put = (url, cb) => {
    if (isSurge()) {
      $httpClient.put(url, cb)
    }
    if (isQuanX()) {
      url.method = 'PUT'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, put, done }
}
