const express = require("express");
const getArticles = require("../controllers/getArticles");
const getTopics = require("../controllers/getTopics");
const routes = express();

routes.get("/topics/pregnancy-month/:stage", getTopics);

routes.get("/articles/:stage", getArticles);

module.exports = routes;
