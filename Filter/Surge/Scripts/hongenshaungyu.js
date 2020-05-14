
var obj = JSON.parse($response.body);

obj = {"is_vip": 0"}
$done({body: JSON.stringify(obj)});
