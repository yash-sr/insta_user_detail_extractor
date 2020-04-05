const axios = require("axios");
var owner_id = 10714135263;
axios
  .get("https://i.instagram.com/api/v1/users/" + owner_id + "/info/", {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Linux; Android 8.1.0; motorola one Build/OPKS28.63-18-3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.80 Mobile Safari/537.36 Instagram 72.0.0.21.98 Android (27/8.1.0; 320dpi; 720x1362; motorola; motorola one; deen_sprout; qcom; pt_BR; 132081645)"
    }
  })
  .then(function(response) {
    var username = response.data.user.username;
    var userUrl = "https://www.instagram.com/" + username + "/?__a=1";
    axios
      .get(userUrl)
      .then(response => {
        console.log(response)
        if (response.data.graphql) {
          const {
            biography,
            edge_followed_by,
            edge_follow,
            full_name,
            id,
            is_business_account,
            is_private,
            profile_pic_url_hd,
            username
          } = response.data.graphql.user;
          const user = {
            biography,
            edge_followed_by,
            edge_follow,
            full_name,
            id,
            is_business_account,
            is_private,
            profile_pic_url_hd,
            username
          };
          console.log(user);
        } else {
          console.log("wait for few minutes");
        }
      })
      .catch(e => {
        console.log(e.response.status + " --,,,-- " + e.response.data.message);
      });
  })
  .catch(e => {
    console.log(e);
  });
