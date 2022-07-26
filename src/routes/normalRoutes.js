const express = require("express");
const getTopics = require("../controllers/getTopics");
const routes = express();

routes.get("/topics/pregnancy-month/:pregnancyMonth", getTopics);

module.exports = routes;
