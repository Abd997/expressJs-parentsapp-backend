const testValidateRequest = require("./validateRequest");
const testRequestHandler = require("./handler");

describe("test registration module", () => {
	testValidateRequest();
	testRequestHandler();
});
