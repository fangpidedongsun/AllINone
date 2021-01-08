
/*
https://bjapi.ejoy.sinopec.com/api/advertisement-service/start-module/app/flashScreen

*/
let obj=JSON.parse($response.body);

obj.countdown=0;
obj.url="";
obj.status=false;

$done({body: JSON.stringify(obj)})
