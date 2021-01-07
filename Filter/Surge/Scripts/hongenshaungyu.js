
/*
[rewrite_local]
# 洪恩(双语绘本、数学、儿童英语)
^https:\/\/bookapi.ihuman.com:443\/v3\/get_book_info
[mitm]
bookapi.ihuman.com

var obj = JSON.parse($response.body);

obj = {"is_vip": 0}
*/


body = $response.body.replace(/"is_vip":\{[^}]+\}/g /,"is_vip":0);

$done({body});
