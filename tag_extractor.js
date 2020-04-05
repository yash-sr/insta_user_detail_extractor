const axios = require("axios");
const sortObjectsArray = require("sort-objects-array");

async function getSortedResult(data) {
  var sortedData = await sortObjectsArray(data, "followers", { order: "desc" });
  return await sortedData;
}

const getTagData = async tag => {
  var r = [];
  await axios
    .get("https://www.instagram.com/explore/tags/" + tag + "/?__a=1", {
      headers: {
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
      }
    })
    .then(async response => {
      // handle success
      var res = response.data.graphql.hashtag.edge_hashtag_to_media.edges;
      r = res;
    })
    .catch(e => console.log(e));
  return await r;
};

const getUserNames = async edge => {
  var r = "i";
  var owner_id = edge.node.owner.id;
  var url = "https://i.instagram.com/api/v1/users/" + owner_id + "/info/";

  await axios
    .get(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.1.0.26.115 (iPhone8,1; iOS 13_3; en_US; en-US; scale=2.00; 750x1334; 190542906)"
      }
    })
    .then(response => {
      // handle success
      var res = response.data.user.username;
      r = res;
    })
    .catch(e => {
      console.log(e.response.status);
      r = null;
    });
  return r;
};
const getUserData = name => {
  return axios
    .get("https://www.instagram.com/" + name + "/?__a=1", {
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.1.0.26.115 (iPhone8,1; iOS 13_3; en_US; en-US; scale=2.00; 750x1334; 190542906)"
      }
    })
    .then(function(response) {
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
          followers: edge_followed_by.count,
          edge_follow: edge_follow.count,
          full_name,
          id,
          is_business_account,
          is_private,
          profile_pic_url_hd,
          username
        };
        return user;
      } else {
        return "later";
      }
    })
    .catch(function(e) {
      return { error: e };
    });
};
exports.getTagData = getTagData;
exports.getUserNames = getUserNames;
exports.getUserData = getUserData;
exports.getSortedResult = getSortedResult;
