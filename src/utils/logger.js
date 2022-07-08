const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
	level: "debug",
	// format: combine(
	// 	format.colorize(),
	// 	timestamp({ format: "YYYY-MM-DD HH:mm" }),
	// 	myFormat
	// ),
	format: combine(
		format.colorize(),
		format.printf((info) => {
			return `[${info.level.padEnd(8)}] - ${info.message}`;
		})
	),
	// defaultMeta: { service: "user-service" },
	transports: [new transports.Console()]
});

module.exports = logger;
