/*
南方周末 解锁限制
https:\/\/api.infzm.com\/mobile\/contents\/*
hostname：api.infzm.com
*/


var obj = JSON.parse($response.body);
obj = {
      "member_type":5,
      "expire_time":"2030-05-05",
      "user":
      {"islogin":true,"isview":true,"isNewsStand":2,"member_type":5,"expire_time":"2030-05-05","isdigg":true,"isfav":true}
      }

$done({body: JSON.stringify(obj)});
