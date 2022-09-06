const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes");
require("./mongoConnection/MongoConnect");

const app = express();
app.use(express.json());
app.use(cookieParser());

// used PORT 80
const port = 80;

app.use(router);

app.listen(port, () => {
  console.log(`App Listen working on localhost:${port}`);
});
