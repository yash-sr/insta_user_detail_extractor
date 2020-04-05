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
      .then(data => {
        if (data === "later") {
          l++;
        } else {
          userData.push(data);
          console.log(data);
        }

        c++;
        if (l > tagData.length / 2 && sendFlag) {
          console.log(l);
          res.status(404).send("try later");
          sendFlag = false;
        }
        if (c === tagData.length - 1 && sendFlag) {
          userData = extractor.getSortedResult(userData);
          res.status(201).send(userData);
          sendFlag = false;
        }
      })
      .catch(e => console.log(e));
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
