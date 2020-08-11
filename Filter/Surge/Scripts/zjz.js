/*
智能证件照相机-最美证件照拍照软件 解锁限制
https:\/\/*.yiyongcad\.com\/api\/v4\/memprofile
https:\/\/*.yiyongcad\.com\/api\/v4\/virtualactregister
hostname：*.yiyongcad.com
*/


var obj = JSON.parse($response.body);
obj = {
        vip:
        [{
            id:8888881,
            auth_type:1,
            auth_value:1800000000,
            vip_valid:1,
            vip_deadline:1800000000,
            uid:"已解锁"
        }]
      }

$done({body: JSON.stringify(obj)});
