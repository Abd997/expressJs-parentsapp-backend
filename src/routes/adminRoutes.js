const express = require("express");
const router = express.Router();

router.get("/add-article", (req, res) => res.send("hw"));

module.exports = router;
