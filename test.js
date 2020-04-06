const axios = require("axios");
var owner_id = 10714135263;
axios
  .get("https://i.instagram.com/api/v1/users/" + owner_id + "/info/", {
    headers: {
      "user-agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.1.0.26.115 (iPhone8,1; iOS 13_3; en_US; en-US; scale=2.00; 750x1334; 190542906)"
    }
  })
  .then(function(response) {
    var username = response.data.user.username;
    var printFlag = true;
    var userUrl = "https://www.instagram.com/" + username + "/?__a=1";
    axios
      .get(userUrl, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.1.0.26.115 (iPhone8,1; iOS 13_3; en_US; en-US; scale=2.00; 750x1334; 190542906)"
        }
      })
      .then(response => {
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
          if (printFlag) {
            console.log(user);
            printFlag = false;
          }
        } else {
          if (printFlag) {
            console.log(response);
            printFlag = false;
          }
        }
      })
      .catch(e => {
        console.log(e.response.status + " --,,,-- " + e.response.data.message);
      });
  })
  .catch(e => {
    console.log(e);
  });
