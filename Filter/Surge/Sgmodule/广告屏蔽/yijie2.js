
/*
删除 
https://bjapi.ejoy.sinopec.com/api/advertisement-service/advertisement/hotspot/app-list
*/
let obj=JSON.parse($response.body);
obj.name="";
obj.closeChannel=1;
obj.closeChannelConfiguration="";
obj.picture="";
obj.pictureConfiguration="";


$done({body: JSON.stringify(obj)})
