/*
去听 有声小说名著听书神器 解锁会员
https:\/\/www\.cnquting\.com\/services\/GetUserInfo.aspx
hostname：www.cnquting.com
*/

var obj = JSON.parse($response.body);
obj = {
      "VipStatus": "1",
      "VipDeadline":"2030-11-11"
      }

$done({body: JSON.stringify(obj)});
