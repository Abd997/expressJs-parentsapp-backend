const testValidateRequest = require("./validateRequest");
const testHandler = require("./handler");

describe("test login module", () => {
	testValidateRequest();
	testHandler();
});
