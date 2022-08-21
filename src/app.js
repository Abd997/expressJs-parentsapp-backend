const express = require("express");
const app = express();
const sendErrorResponse = require("./sendErrorResponse");
const {
	adminRoutes,
	authorizedRoutes,
	normalRoutes
} = require("./routes");
const verifyToken = require("./utils/verifyToken");
const verifyAdminToken = require("./utils/verifyAdminToken");

const VERSION = "1.1.1";

app.use(express.static("images"));
app.use(express.json());

app.use("/", normalRoutes);
app.use("/admin", verifyAdminToken, adminRoutes);
app.use("/auth/user", verifyToken, authorizedRoutes);

app.get("/version", (req, res) => {
	res.send(VERSION);
});

app.get("*", (req, res) => {
	sendErrorResponse(res, 400, "Route does not exists");
});

module.exports = app;
