const sequelize = require("./utils/db");
const app = require("./app");
const log = require("./utils/logger");
const { connectDB } = require("./utils/database");
const migrate = require("../data-migration");
require("dotenv").config();

(async () => {
	await migrate();
	try {
		await connectDB();
		log.info("Backend is connected to database");
	} catch (error) {
		log.error("Could not connect to database \n" + error);
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
