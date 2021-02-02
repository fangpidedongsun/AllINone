/*
FIMO 复古胶片相机 解锁限制
https:\/\/server\.yoyiapp\.com\/fimo-user\/user\/sync
hostname：server.yoyiapp.com
govo.yy.com
filter/common
*/


var obj = JSON.parse($response.body);

obj = {
      "films":
      [{
      "goodId": "fimoAesthetic400",
      "goodName": "Aesthetic 400",
      "goodPrice": 0,
      "pay": "sync",
      "photo": 0,
      "time": "2020-04-27 11:13:06" },
      {"goodId": "fimoIFPAN100",
       "goodName": "PAN 100",
       "goodPrice": 0,
       "pay": "sync",
       "photo": 0,
       "time": "2020-04-27 11:13:06"
      },
      {"goodId": "fimoLMcolor100",
       "goodName": "LM Color 100",
       "goodPrice": 0,
       "pay": "sync",
       "photo": 0,
       "time": "2020-04-27 11:13:06"
      },
      {"goodId": "fimoBusiness400",
      "goodName": "Business 400",
      "goodPrice": 0,
      "pay": "sync",
      "photo": 0,
      "time": "2020-04-27 11:13:06"
      },
      {"goodId": "fimoEK80",
      "goodName": "EK 80",
      "goodPrice": 0,
      "pay": "sync",
      "photo": 0,
      "time": "2020-04-27 11:13:06"
      },
      {"goodId": "fimoYummy100",
      "goodName": "Yummy 100",
      "goodPrice": 0,
      "pay": "sync",
      "photo": 0,
      "time": "2020-04-27 11:13:06"
      },
      {"goodId": "fimoXRed50",
      "goodName": "X-Red 50",
      "goodPrice": 0,
      "pay": "sync",
      "photo": 0,
      "time": "2020-04-27 11:13:06"
      },
      {"goodId": "fimoJoey100T",
      "goodName": "Joey 100T",
      "goodPrice": 0,
      "pay": "sync",
      "photo": 0,
      "time": "2020-04-27 11:13:06"
      },
      {"goodId": "fimoMorandi200",
      "goodName": "Morandi 200",
      "goodPrice": 0,
      "pay": "apple",
      "photo": 0,
      "time": "1995-01-15 14:00:00"
      },
      {"goodId": "fimoSuperHR100",
      "goodName": "SuperHR 100",
      "goodPrice": 6,
      "pay": "apple",
      "photo": 0,
      "time": "1998-01-15 14:00:00"
      },
      {"goodId": "fimoEPR64",
      "goodName": "EPR 64",
      "goodPrice": 6,
      "pay": "apple",
      "photo": 0,
      "time": "1998-02-15 14:33:00"
      },
      {"goodId": "fimoPortra160NC",
      "goodName": "PortraNC 160NC",
      "goodPrice": 12,
      "pay": "apple",
      "photo": 0,
      "time": "1998-10-15 14:33:00"
      },
      {"goodId": "fimoKDchrome64",
      "goodName": "KDchrome 64",
      "goodPrice": 12,
      "pay": "apple",
      "photo": 0,
      "time": "2001-01-15 13:00:22"
      },
      {"goodId": "fimoTriX400",
      "goodName": "TriX 400",
      "goodPrice": 8,
      "pay": "apple",
      "photo": 0,
      "time": "1807-11-13 19:00:00"
      },
      {"goodId": "fimoTSE50",
      "goodName": "TSE 50",
      "goodPrice": 12,
      "pay": "apple",
      "photo": 0,
      "time": "1807-11-13 19:00:00"
      },

      {"goodId": "fimoNatura1600",
      "goodName": "Natura 1600",
      "goodPrice": 1,
      "pay": "apple",
      "photo": 0,
      "time": "1899-12-13 19:15:33"
      },
      {"goodId": "fimoBubble400",
      "goodName": "Bubble 400",
      "goodPrice": 6,
      "pay": "apple",
      "photo": 0,
      "time": "1954-10-21 01:00:00"  },
      {"goodId": "fimoDE200",
      "goodName": "DE 200",
      "goodPrice": 12,
      "pay": "apple",
      "photo": 0,
      "time": "1989-10-25 08:30:00"  },
      {"goodId": "fimoTokyo500",
      "goodName": "Tokyo 500",
      "goodPrice": 12,
      "pay": "apple",
      "photo": 0,
      "time": "2000-02-10 17:00:00"  },
      {"goodId": "fimoHK200",
      "goodName": "HK 200",
      "goodPrice": 6,
      "pay": "apple",
      "photo": 0,
      "time": "1999-08-10 10:35:00"},

      {"goodId": "fimoRDP3",
      "goodName": "RDP 3",
      "goodPrice": 12,
      "pay": "apple",
      "photo": 0,
      "time": "2021-01-26 22:44:17"},

      {"goodId": "fimoUnicolor125",
      "goodName": "Unicolor 125 iOS",
      "goodPrice": 12,
      "pay": "apple",
      "photo": 0,
      "time": "1807-11-13 19:00:00"},

      {"goodId": "fimoCenturia100",
      "goodName": "Konika Centuria 100",
      "goodPrice": 6,
      "pay": "apple",
      "photo": 0,
      "time": "1807-11-13 19:00:00"},

      {"goodId": "fimoNewYear2020",
      "goodName": "New Year 2020",
      "goodPrice": 0,
      "pay": "apple",
      "photo": 0,
      "time": "1807-11-13 19:00:00"},

      {"goodId": "fimoNewYear2020Lunar",
      "goodName": "New Year 2020 Lunar",
      "goodPrice": 0,
      "pay": "apple",
      "photo": 0,
      "time": "1807-11-13 19:00:00"}
    ]}
$done({body: JSON.stringify(obj)});
