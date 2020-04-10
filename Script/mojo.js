/*
mojo解锁Pro
https://api.revenuecat.com/v1/subscribers/
*/

var obj = JSON.parse($response.body);

obj= {
  "request_date_ms": 1586526610353,
  "request_date": "2020-04-10T13:50:10Z",
  "subscriber": {
    "first_seen": "2020-03-12T00:37:49Z",
    "original_application_version": "198",
    "other_purchases": {
    },
    "subscriptions": {
      "video.mojo.pro.yearly": {
        "is_sandbox": false,
        "period_type": "trial",
        "billing_issues_detected_at": null,
        "unsubscribe_detected_at": null,
        "expires_date": "2099-04-10T03:51:32Z",
        "original_purchase_date": "2020-03-30T02:51:33Z",
        "purchase_date": "2020-03-30T02:51:32Z",
        "store": "app_store"
      }
    },
    "entitlements": {
      "pro": {
        "expires_date": "2099-04-10T03:51:32Z",
        "product_identifier": "video.mojo.pro.yearly",
        "purchase_date": "2019-04-10T02:51:32Z"
      }
    },
    "original_purchase_date": "2020-03-12T00:03:39Z",
    "original_app_user_id": "er9k2Gfvv9MMQN4OgcItfiaJ0y33",
    "non_subscriptions": {
    }
  }
};

$done({body: JSON.stringify(obj)});

