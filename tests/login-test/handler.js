const request = require("supertest");
const app = require("../../src/app");

module.exports = (data) =>
	describe("test login handler", () => {
		it("returns 200 if a user logins successfully", async () => {
			const response = await request(app).post("/login").send({
				email: data.email,
				password: "password"
			});
			expect(response.statusCode).toBe(200);
			expect(response.body.msg).toEqual(
				"User successfully authenticated"
			);
		});
	});
