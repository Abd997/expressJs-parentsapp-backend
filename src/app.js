const express = require("express");
const app = express();
const sendErrorResponse = require("./sendErrorResponse");
const {
	adminRoutes,
	authorizedRoutes,
	normalRoutes
} = require("./routes");
const registerUser = require("./controllers/registerUser");
const authenticateUser = require("./controllers/authenticateUser");

const VERSION = "0.6.3";

app.use(express.json());

app.post("/user/login", authenticateUser);

app.post("/user/register", registerUser);

app.use("/admin", adminRoutes);
app.use("/auth", authorizedRoutes);
app.use("/", normalRoutes);

app.get("/version", (req, res) => {
	res.send(VERSION);
});

app.get("*", (req, res) => {
	sendErrorResponse(res, 400, "Route does not exists");
});

module.exports = app;
