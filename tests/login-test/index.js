const testValidateRequest = require("./validateRequest");
const testHandler = require("./handler");

module.exports = () =>
	describe("test login module", () => {
		testValidateRequest();
		testHandler();
	});
