const router = require("express").Router();
const articles = require("../articles");

router.get("/articles", articles.validateReq, articles.getArticles);

module.exports = router;
