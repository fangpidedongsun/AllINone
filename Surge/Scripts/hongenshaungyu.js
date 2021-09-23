
/*
[rewrite_local]
# 洪恩(双语绘本、数学、儿童英语)
^https:\/\/bookapi.ihuman.com:443\/v3\/get_book_info
[mitm]
bookapi.ihuman.com
*/

body = $response.body.replace(/\"is_vip\":1/g, "\"is_vip\":0")
$done({body});
