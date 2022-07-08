const sequelize = require("./utils/db");
const app = require("./app");
const log = require("./utils/logger");
require("dotenv").config();

const Parent = require("./models/parent");

sequelize
	.sync({ alter: true })
	.then((result) =>
		console.log("All models were synchronized successfully.")
	)
	.catch((err) => console.log(err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
	log.info(
		`Server started at PORT:${PORT}, MODE:${process.env.NODE_ENV}`
	)
);
