/*
快知 解锁VIP
https:\/\/kz.sync163.com\/api_v2\/user\/info
hostname：kz.sync163.com
*/


let obj = JSON.parse($response.body);
obj = {
        "experiencer":1,
        "vip_expired":"false",
        "vip":1,
        "vip_expired_at":2361-12-12,
        "vip_is_gift":"true"
      }
$done({body: JSON.stringify(obj)});
