const express = require("express");
const getArticles = require("../controllers/getArticles");
const getArticlesByEmail = require("../controllers/getArticlesByEmail");
const getTopics = require("../controllers/getTopics");
const routes = express();

routes.get("/topics/pregnancy-month/:pregnancyStage", getTopics);

routes.get("/articles/pregnancy-stage/:pregnancyStage", getArticles);

routes.get("/articles/user/:email", getArticlesByEmail);

module.exports = routes;
