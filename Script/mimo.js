/*
MIMO解锁Pro自行测试
https://api.getmimo.com/v1/subscriptions
*/

var obj = JSON.parse($response.body);

obj = {
  "source": "ios",
  "status": "active",
  "interval": "yearly",
  "trialEndAt": "2029-04-17T10:04:16+00:00",
  "subscriptions": [
    {
      "source": "ios",
      "status": "active",
      "interval": "yearly",
      "trialEndAt": "2029-04-17T10:04:16+00:00",
      "billingInfo": {
        "currency": "TWD",
        "paymentPending": false,
        "nextBillingPrice": 2690
      },
      "intervalCount": 1,
      "activeUntil": "2020-04-17T10:04:16+00:00",
      "createdAt": "2020-04-10T10:04:16+00:00",
      "clientSecret": "",
      "isActive": true
    }
  ],
  "billingInfo": {
    "currency": "TWD",
    "paymentPending": false,
    "nextBillingPrice": 2690
  },
  "intervalCount": 1,
  "activeUntil": "2020-04-17T10:04:16+00:00",
  "createdAt": "2020-04-10T10:04:16+00:00",
  "clientSecret": "",
  "isActive": true
}
$done({body: JSON.stringify(obj)});
