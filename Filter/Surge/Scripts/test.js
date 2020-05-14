var obj = JSON.parse($response.body);
obj = {
    "vip_expire_date": 1592631728,
    "token": {
      "expire": 2592000,
      "userid": "6915328",
      "token": "lqlWASzrSk5VhEUWCbvwe22Su1vFsh8dj4Ryl8uYfyg="
    },
    "vip_type": 1,
    "checkin_status": {
      "checkin_days": 0,
      "today_checkedin": 0,
      "lucky_draw": -1,
      "user_point": 5
    },
    "newuser": 0,
    "interests": "1,2,3,4,5",
    "mobile": "13261786407",
    "coin": "500",
    "email": "",
    "plan_notice": 1,
    "_s": {
      "sf": "Ud18cJnvyhtOES+SOn7yk97o3yr4AaxT1qFM0sKvB5wEQicG7LWmHtULiXVHSvQygjlZMOa49x4qLyfIZTSTRw9G9bEwVPCLgELLEW2BfXC7+5lXGtsqiHCoaeH4hOxO+xd6BV20brIkIc4pWrQsxYIUtLHpvtO3xpjqhXOv5YTzzXlA3Ve0UBHpFDkalCPQeOubVznjUqDYHWrK2uLj2td8q1e55HJ0Kp+2Vinn2u0C1C1R2QfCdj9PbUybyiqm67CgF+t18ER9CqX3EJZsguWX7HWneDbb46F1cEwPFTCBTjVOHWMAvhJYRGlx0L8AjcudeeIhKjJQyTAw==",
      "debug_signsrc": "uid=6915328&vip_expire_date=1589694128&vip_type=1",
      "sk": "SfMgt922jGcFGALW0Vr9w9b+Qt2EPdsqSbHH7tFAz2uJMz6OfUNuByGiCYZhpg3MtDaDYlYGcI1HoAl7bqBS6tH4aY2ff6KPfBxxN8e18cB5dzqwXu+eJB4HEXYMI2RNItL2JN6sfFJBGrsFfvBJ5KauvOYUGicB2Av+H+PbI+seVxClsTtyQg1bojR2se3v2Ooxk55oqAExvg5wg5YXUkxHLGRR5FeEGufUzKZA6r8LhJCO5oKfzsH9f4t8dJkQMvEEhLGE2Y4R4RJBPiI+TWqz1S6nZTFsuNfDcAaqaGzqmiu3oNIhbjSOT3C9T04jWjN4lDenOjMjZ0w==",
      "kl": "get_user_info,uid,vip_expire_date,vip_type"
    },
    "gender": 2,
    "nickname": "冬笋不是菜",
    "uid": "6915328",
    "status": 0,
    "avatar": "https:\/\/avatar.ihumand.com\/2\/2020-05-14\/972c3a831bfc474591d77e036a706c603a36_1589427218.jpg",
    "birthday": 1558064018
  }
$done({body: JSON.stringify(obj)});
