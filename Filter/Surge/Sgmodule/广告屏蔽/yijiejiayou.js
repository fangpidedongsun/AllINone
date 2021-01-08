
/*
https://bjapi.ejoy.sinopec.com/api/advertisement-service/start-module/app/flashScreen
obj.resource=0;
obj.countdown=0;
obj.url="";
obj.status=false;
*/
let obj=JSON.parse($response.body);
obj['data']['resource'] = null;
obj['data']['countdown'] = 0;
obj['data']['url'] = null;

$done({body: JSON.stringify(obj)})
