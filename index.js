const express = require("express");
const app = express();

const path = require("path");

const port = 3003;

app.use(express.static(path.join(__dirname, "./public")));

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.use('/test', (req, res) => {
  res.send('test');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
