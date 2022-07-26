const supertest = require("supertest");
const app = require("../../src/app");

module.exports = (data) => {
	describe("test get articles", () => {
		it("returns 6 articles", async () => {
			let response = await supertest(app).post("/user/login").send({
				email: data.email,
				password: data.password
			});
		});
	});
};
