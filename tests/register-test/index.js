const testValidateRequest = require("./validateRequest");
const testRequestHandler = require("./handler");

module.exports = () =>
	describe("test registration module", () => {
		testValidateRequest();
		testRequestHandler();
	});
