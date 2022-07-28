const express = require("express");
const getArticles = require("../controllers/getArticles");
const getTopics = require("../controllers/getTopics");
const routes = express();

routes.get("/topics/pregnancy-month/:pregnancyStage", getTopics);

routes.get("/articles/:stage", getArticles);

module.exports = routes;
