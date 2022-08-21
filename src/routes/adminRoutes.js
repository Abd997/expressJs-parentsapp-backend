const express = require("express");
const addArticleImage = require("../admin-controllers/addArticleImage");
const admin_articles = require("../admin-controllers/admin-articles");
const { admin_chat } = require("../admin-controllers/admin-chat");
const admin_sub_topic = require("../admin-controllers/admin-sub-topics");
const admin_topics = require("../admin-controllers/admin-topics");
const ArticleRepo = require("../repo/ArticleRepo");
const multerStorage = require("../utils/multerStorage");
const route = express.Router();

// ============ CHAT ============
route.get("/unread-messages", admin_chat.getAllUnreadMessages);
route.post("/message", admin_chat.sendMessageToUser);

route.post("/topic", admin_topics.addTopic);

route.post("/subtopic", admin_sub_topic.addSubTopic);

route.post("/article", admin_articles.addArticle);

route.post(
	"/article/image",
	multerStorage.single("image"),
	addArticleImage
);

module.exports = route;
