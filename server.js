const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("hello!"));
app.listen(port, () => `server running on port ${port}`);
