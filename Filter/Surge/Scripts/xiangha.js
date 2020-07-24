/*
香哈菜谱 解锁限制
https:\/\/apiios\.xiangha\.com\/main8\/dish\/topInfo
hostname：apiios.xiangha.com
*/
var obj = JSON.parse($response.body);
obj = {"power":
        {"res":true,
          "extra":
        }
      }

$done({body: JSON.stringify(obj)});
