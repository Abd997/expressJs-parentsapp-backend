const sequelize = require("./utils/db");
const app = require("./app");
const log = require("./utils/logger");
const { connectDB } = require("./utils/database");
require("dotenv").config();

(async () => {
	try {
		if (process.env.NODE_ENV === "development") {
			await connectDB();
		} else if (process.env.NODE_ENV === "production") {
			await connectDB();
		}
		log.info("Backend is connected to database");
	} catch (err) {
		log.error("Could not connect to database");
	}
	try {
		const PORT = process.env.PORT || 8080;
		await app.listen(PORT);
		log.info(
			`Server started at PORT:${PORT}, MODE:${process.env.NODE_ENV}`
		);
	} catch (error) {
		log.error("Could not start server " + error);
	}
})();
