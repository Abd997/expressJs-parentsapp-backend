const express = require("express");
const routes = express();
const path = require("path");
const loginAdmin = require("../admin-controllers/loginAdmin");
const getArticles = require("../controllers/getArticles");
const getArticlesByEmail = require("../controllers/getArticlesByEmail");
const getEmailAvailablity = require("../controllers/getEmailAvailablity");
const getTopics = require("../controllers/getTopics");
const getUsernameAvailability = require("../controllers/getUsernameAvailability");
const loginUser = require("../controllers/loginUser");
const registerUser = require("../controllers/registerUser");

routes.get("/topics/pregnancy-month/:pregnancyStage", getTopics);

routes.get("/articles/pregnancy-stage/:pregnancyStage", getArticles);
routes.get("/articles/user/:email", getArticlesByEmail);

routes.post("/user/login", loginUser);
routes.post("/user/register", registerUser);

routes.post("/admin/login", loginAdmin);

routes.get("/availabilty/email/:email", getEmailAvailablity);

routes.get(
	"/availabilty/username/:username",
	getUsernameAvailability
);

routes.get("/image/:imageName", async (req, res) => {
	const root = path.join(__dirname, "../../images/articles");
	let options = {
		root: root,
		dotfiles: "deny",
		headers: {
			"x-timestamp": Date.now(),
			"x-sent": true
		}
	};
	res.sendFile(req.params.imageName, options);
});

module.exports = routes;
