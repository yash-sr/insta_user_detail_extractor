const axios = require("axios");
const sortObjectsArray = require("sort-objects-array");

async function getSortedResult(data) {
  var sortedData = await sortObjectsArray(data, "followers", { order: "desc" });
  return sortedData;
}

async function UserExtractor(tag) {
  var userData = ["start"];
  var sortData = [];
  var tagData = [...new Set(await getTagData(tag))];

  var c = 0;

  var bar = new Promise((resolve, reject) => {
    tagData.forEach(async (edge, index, array) => {
      var name = await getUserNames(edge);
      console.log(name);
      userData.push(name);
      console.log(tagData.length + ", " + index);
      if (index === tagData.length - 1 || name === 429) resolve();
    });
  });
  var flag = false;

  bar.then(() => {
    console.log("All done!");
    flag = true;
    return userData;
  });
  if (flag === true) return userData;
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
          "Mozilla/5.0 (Linux; U; Android 5; nl-nl; GT-P6800 Build/HTJ85B) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.1.0.26.115 (iPhone11,8; iOS 13_3; en_US; en-US; scale=2.00; 828x1792; 190542906"
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
  return await r;
};

exports.UserExtractor = UserExtractor;

// var c = 0;
//     const n = res.length;
//     res.forEach(edge => {
//       var owner_id = edge.node.owner.id;
//       var url = "https://i.instagram.com/api/v1/users/" + owner_id + "/info/";
//       axios
//         .get(url, {
//           headers: {
//             "user-agent":
//               "Mozilla/5.0 (Linux; U; Android 5; nl-nl; GT-P6800 Build/HTJ85B) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.1.0.26.115 (iPhone11,8; iOS 13_3; en_US; en-US; scale=2.00; 828x1792; 190542906)"
//           }
//         })
//         .then(function(response) {
//           var username = response.data.user.username;
//           var userUrl = "https://www.instagram.com/" + username + "/?__a=1";

//           axios
//             .get(userUrl, {
//               headers: {
//                 "user-agent":
//                   "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 123.1.0.26.115 (iPhone11,8; iOS 13_3; en_US; en-US; scale=2.00; 828x1792; 190542906)"
//               }
//             })
//             .then(response => {
//               const {
//                 biography,
//                 edge_followed_by,
//                 edge_follow,
//                 full_name,
//                 id,
//                 is_business_account,
//                 is_private,
//                 profile_pic_url_hd,
//                 username
//               } = response.data.graphql.user;
//               const user = {
//                 biography,
//                 followers: edge_followed_by.count,
//                 edge_follow: edge_follow.count,
//                 full_name,
//                 id,
//                 is_business_account,
//                 is_private,
//                 profile_pic_url_hd,
//                 username
//               };
//               userData.push(user);
//               c++;
//             })
//             .catch(e => {
//               console.log("oo");
//             });
//         })
//         .catch(function(error) {
//           // handle error
//           console.log(error.response.data.message);
//         });
//     });

// if (c == n - 1) {
//   sortData = getSortedResult(userData);
//   console.log(sortData[0].followers);
//   return sortData;
// }
//   })
//   .catch(function(error) {
//     // handle error
//     console.log("qq");
//   });
