const sequelize = require("./utils/db");
const app = require("./app");
const log = require("./utils/logger");
const { connectDB } = require("./utils/database");
const migrate = require("../data-migration");
require("dotenv").config();

(async () => {
	try {
		await migrate();
		await connectDB();
		log.info("Backend is connected to database");
		const PORT = process.env.PORT || 8080;
		await app.listen(PORT);
		log.info(
			`Server started at PORT:${PORT}, MODE:${process.env.NODE_ENV}`
		);
	} catch (error) {
		log.error("Could not start server");
		log.error(error.message);
	}
})();
