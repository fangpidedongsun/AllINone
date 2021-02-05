/**
 * @author shylocks
 */

/*
顺丰速运每日签到
入口：顺丰速运app-我的顺丰-任务中心（更多）
注：每次重新进入任务中心会导致ck失效，需要重新获取

[mitm]
hostname = mcs-mimp-web.sf-express.com

================Qx==============
[task_local]
0 9 * * * https://raw.githubusercontent.com/fangpidedongsun/Alex0510/master/Filter/Others/QX/sf.js, tag=顺丰速运, img-url=https://raw.githubusercontent.com/shylocks/for-own-use/main/Icon/sf.png, enabled=true
[rewrite_local]
https:\/\/mcs-mimp-web\.sf-express\.com\/home url script-request-header https://raw.githubusercontent.com/fangpidedongsun/Alex0510/master/Filter/Others/QX/sf.js

================Loon==============
[Script]
http-request https:\/\/mcs-mimp-web\.sf-express\.com\/home script-path=https://raw.githubusercontent.com/fangpidedongsun/Alex0510/master/Filter/Others/QX/sf.js, requires-body=true, timeout=100, tag=顺丰速运获取ck
cron "0 9 * * *" script-path=https://raw.githubusercontent.com/fangpidedongsun/Alex0510/master/Filter/Others/QX/sf.js, tag=顺丰速运

===============Surge=================
顺丰速运获取ck = type=http-request,pattern=https:\/\/mcs-mimp-web\.sf-express\.com\/home ,script-path=https://raw.githubusercontent.com/fangpidedongsun/Alex0510/master/Filter/Others/QX/sf.js
顺丰速运 = type=cron,cronexp="0 9 * * *",wake-system=1,timeout=300,script-path=https://raw.githubusercontent.com/fangpidedongsun/Alex0510/master/Filter/Others/QX/sf.js

*/

const $ = new Env('顺丰每日签到');
let cookiesArr = []
let urlArr = []
let cookie = '', message = '', url = ''

// 获取cookie
async function getCookie() {
  try {
    if ($request && $request.method !== `OPTIONS`) {
      let cks = $.getdata('CookiesSF') || "[]"
      cks = jsonParse(cks);
      const CookieVal = $request.headers['Cookie']
      const url = JSON.parse(JSON.stringify($request))['url']
      $.log(`Cookie: ${CookieVal}`)
      $.log(`url: ${url}`)
      let mobile = url.match(/mobile=(.*)&userId/)[1]
      let tmpCK = [], update = false
      for (let ck of cks) {
        if (ck['mobile'] === mobile) {
          ck['cookie'] = CookieVal
          update = true
          $.msg($.name, '', `【顺丰账号${mobile}】\nCookie更新成功！`);
        }
        tmpCK.push(ck)
      }
      if (!update) {
        tmpCK.push({
          'cookie': CookieVal,
          'mobile': mobile
        })
        $.msg($.name, '', `【顺丰账号${mobile}】\nCookie获取成功！`);
      }
      $.setdata(JSON.stringify(tmpCK), "CookiesSF")
    }
  } catch (e) {
    $.log(e)
  }
}

if (typeof $request !== 'undefined') {
  getCookie().catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  }).finally(() => {
    $.done()
  })
} else {
  !(async () => {
    if (!$.isNode()) {
      // 提取cookie
      let cks = $.getdata('CookiesSF') || "[]"
      cks = jsonParse(cks)
      for (let ck of cks) {
        if (ck && ck['cookie']) {
          cookiesArr.push(ck['cookie'])
        }
      }
    } else {
      if (process.env.SF_CK) {
        for (let vo of process.env.SF_CK.split("@")) {
          cookiesArr.push(vo)
        }
      }
      if (process.env.SF_URL) {
        for (let vo of process.env.SF_URL.split("@")) {
          urlArr.push(vo)
        }
      }
    }
    for (let i = 0; i < cookiesArr.length; ++i) {
      cookie = cookiesArr[i]
      if ($.isNode()) url = urlArr[i]
      message = ''
      $.point = 0
      $.gainScore = 0
      $.index = i + 1
      if ($.isNode()) await getCk()
      await getTaskList()
      await getTaskList(true)
      await showMsg()
    }
  })()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })
}

function getCk() {
  return new Promise(resolve => {
    $.get({
      "url": url,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 mediaCode=SFEXPRESSAPP-iOS-ML",
        "Cookie": cookie
      },
      followRedirect: false,
    }, (err, resp, data) => {
      cookie = ''
      for (let vo of resp['headers'][$.isNode() ? 'set-cookie' : 'Set-Cookie']) {
        cookie += vo.substr(0, vo.indexOf(";") + 1) + " "
      }
      resolve()
    })
  })
}

function getTaskList(info = false) {
  return new Promise(resolve => {
    $.post(taskUrl("mcs-mimp/appTask/queryPointTaskAndSign",
      {"channel": "SFAPP", "from": "APP_MINE_TASK"}), async (err, resp, data) => {
      try {
        if (safeGet(data)) {
          data = JSON.parse(data)
          if (data['success']) {
            if (!info) {
              $.score = data.obj.totalPoint
              for (let vo of data.obj.taskTitleLevels) {
                if (vo.pageType === 'sign') {
                  if (vo.status !== 2) {
                    console.log(`去做${vo.title}任务`)
                    await fetchSignPoint(vo.pageType)
                  } else {
                    console.log(`${vo.title}任务已做完`)
                  }
                } else if (vo.status === 2 && !['mailPerMonThan3'].includes(vo.pageType)) {
                  console.log(`去做${vo.title}任务`)
                  await doTask(vo.pageType)
                } else if (vo.status === 1.0) {
                  console.log(`去领取${vo.title}任务奖励`)
                  await fetchPoint(vo.pageType)
                }
              }
            } else {
              $.gainScore = data.obj.totalPoint - $.score
              $.score = data.obj.totalPoint
            }
          } else {
            message = 'cookies失效'
          }
        }
      } catch (e) {
        $.log(e);
      }
      resolve()
    })
  })
}

function doTask(pageType) {
  return new Promise(resolve => {
    $.post(taskUrl("mcs-mimp/appTask/scanPageToRecord",
      {"channel": "SFAPP", "from": "APP_MINE_TASK", "pageType": pageType}), async (err, resp, data) => {
      try {
        if (safeGet(data)) {
          data = JSON.parse(data)
          if (data['success']) {
            console.log(`任务记录成功`)
            await fetchPoint(pageType)
          } else {
            message = 'cookies失效'
          }
        }
      } catch (e) {
        $.log(e);
      }
      resolve()
    })
  })
}

function fetchSignPoint(pageType) {
  return new Promise(resolve => {
    $.post(taskUrl("mcs-mimp/appTask/queryPointTaskAndSign",
      {"channel": "SFAPP", "from": "APP_MINE_TASK", "pageType": pageType}), (err, resp, data) => {
      try {
        if (safeGet(data)) {
          data = JSON.parse(data)
          if (data['success']) {
            console.log(`任务完成成功，获得${data.obj}积分`)
            $.point += parseInt(data.obj)
          } else {
            message = 'cookies失效'
          }
        }
      } catch (e) {
        $.log(e);
      }
      resolve()
    })
  })
}

function fetchPoint(pageType) {
  return new Promise(resolve => {
    $.post(taskUrl("mcs-mimp/appTask/fetchPoint",
      {"channel": "SFAPP", "from": "APP_MINE_TASK", "pageType": pageType}), (err, resp, data) => {
      try {
        if (safeGet(data)) {
          data = JSON.parse(data)
          console.log(data)
          if (data['success']) {
            console.log(`任务领奖成功`)
          } else {
            console.log(`任务领奖失败，错误原因：${data.errorMessage}`)
          }
        }
      } catch (e) {
        $.log(e);
      }
      resolve()
    })
  })
}

function showMsg() {
  message += `本次运行获得${$.gainScore}积分，共计${$.score}积分`
  return new Promise(resolve => {
    $.msg($.name, '', `【顺丰账号${$.index}】\n${message}`);
    resolve()
  })
}


function taskUrl(function_id, body = {}) {
  return {
    url: `https://mcs-mimp-web.sf-express.com/${function_id}/`,
    body: JSON.stringify(body),
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/json;charset=utf-8",
      "Host": "mcs-mimp-web.sf-express.com",
      "Origin": "https://mcs-mimp-web.sf-express.com",
      "Referer": `https://mcs-mimp-web.sf-express.com/myPoints`,
      "Cookie": cookie,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 mediaCode=SFEXPRESSAPP-iOS-ML"
    }
  }
}


function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`顺丰服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie')
      return [];
    }
  }
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
