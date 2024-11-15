const express = require("express");
const app = express();

const path = require("path");

const port = 3003;

app.use(express.static(path.join(__dirname, "./public")));

app.use('/test', (req, res) => {
  res.send('Hello test');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
