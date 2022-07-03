const app = require("./app");
const log = require("./logger");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
	log.info(
		`Server started at PORT:${PORT}, MODE:${process.env.NODE_ENV}`
	)
);
