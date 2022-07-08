const express = require("express");
const app = express();
const login = require("./login-module/login");
const registration = require("./registration-module/registration");
const sendErrorResponse = require("./sendErrorResponse");

app.use(express.json());

app.post("/login", login.validateReq, login.handleReq);

app.post(
	"/register",
	registration.validateReq,
	registration.handleReq
);

app.get("*", (req, res) => {
	sendErrorResponse(res, 400, "Route does not exists");
});

module.exports = app;
