const express = require("express");
const app = express();
const login = require("./login-module/login");
const registration = require("./registration-module/registration");
const sendErrorResponse = require("./sendErrorResponse");
const {
	adminRoutes,
	authorizedRoutes,
	normalRoutes
} = require("./routes");

const VERSION = "0.5.1";

app.use(express.json());

app.post("/user/login", login.validateReq, login.handleReq);

app.post(
	"/user/register",
	registration.validateReq,
	registration.handleReq
);

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
