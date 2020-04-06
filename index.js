const express = require("express");
const extractor = require("./tag_extractor");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  var userData = [];
  var sendFlag = true;
  var c = 0;
  var l = 0;
  var tagData = [...new Set(await extractor.getTagData(req.params.tag))];
  tagData.forEach(async edge => {
    var name = await extractor.getUserNames(edge);
    await extractor
      .getUserData(name)
      .then(async data => {
        if (data === "later") {
          l++;
        } else {
          userData[userData.length] = data;
          console.log(data);
        }

        c++;
        if (c === tagData.length - 1 && sendFlag) {
          userData = await extractor.getSortedResult(userData);
          if (userData !== {}) await res.status(201).send(userData);
          else await res.status(401).send("try later");
          sendFlag = false;
        }
      })
      .catch(e => console.log(e));
  });
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
