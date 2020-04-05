const express = require("express");
const user = require("./tag_extractor");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  var users = await user.UserExtractor(req.params.tag);

  if (users.length > 1) {
    console.log("sending");
    await res.send(users);
  } else res.sendStatus(400);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
