const app = require("express")();

app.get("*", (req, res) => {
	res.status(400).send({ message: "Route does not exists" });
});

module.exports = app;
