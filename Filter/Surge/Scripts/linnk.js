/*
linnk书签 解锁限制
https:\/\/linnk\.net\/a\/api\/userInfo
hostname：linnk.net
*/

var obj = JSON.parse($response.body);

obj = {"level":1"}
$done({body: JSON.stringify(obj)});
