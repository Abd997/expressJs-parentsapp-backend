const testValidateRequest = require("./validateRequest");
const testHandler = require("./handler");

module.exports = (data) =>
	describe("test login module", () => {
		testValidateRequest(data);
		testHandler(data);
	});
