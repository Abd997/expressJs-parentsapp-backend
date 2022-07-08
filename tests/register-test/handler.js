const request = require("supertest");
const app = require("../../src/app");
const sequelize = require("../../src/utils/db");

module.exports = (data) =>
	describe("test registration handler", () => {
		const route = "/register";

		it("should return 201 when a user is registered", async () => {
			const response = await request(app).post(route).send({
				email: data.email,
				name: "test",
				password: "password"
			});
			expect(response.statusCode).toBe(201);
			expect(response.body.msg).toBe("User successfully created");
		});
	});
