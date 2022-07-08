const testValidateRequest = require("./validateRequest");
const testRequestHandler = require("./handler");

module.exports = (data) =>
	describe("test registration module", () => {
		testValidateRequest(data);
		testRequestHandler(data);
	});
