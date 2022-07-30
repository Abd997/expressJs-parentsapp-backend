const express = require("express");
const app = express();
const sendErrorResponse = require("./sendErrorResponse");
const {
	adminRoutes,
	authorizedRoutes,
	normalRoutes
} = require("./routes");

const VERSION = "0.8.0";

app.use(express.json());

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
