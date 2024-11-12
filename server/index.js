const express = require("express");
const path = require("path");

const router = express.Router();
router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

const port = 3000;
const app = express();
app.use(router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
