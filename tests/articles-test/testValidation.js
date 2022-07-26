const request = require("supertest");
const app = require("../../src/app");

module.exports = () => {
	describe("test GET /articles validation", () => {
		const url = "/auth/articles";

		it("returns 401 when no token is sent", async () => {
			const response = await request(app).get(url);
			expect(response.statusCode).toBe(401);
			expect(response.body.errors[0].msg).toEqual("Token not sent");
		});

		it("returns 401 when invalid token is sent", async () => {
			const response = await request(app)
				.get(url)
				.set("Authorization", `Bearer token`);
			expect(response.statusCode).toBe(401);
			expect(response.body.errors[0].msg).toEqual("Token is invalid");
		});
	});
};
