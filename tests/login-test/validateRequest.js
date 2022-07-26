const request = require("supertest");
const app = require("../../src/app");

module.exports = (data) =>
	describe("validate the request", () => {
		const route = "/user/login";
		it("should return 401 when no credentials sent", async () => {
			const response = await request(app).post(route);
			expect(response.statusCode).toBe(401);
		});

		it("should return 401 Password not provided when password not sent", async () => {
			const response = await request(app).post(route).send({
				email: "test@gmail.com"
			});
			expect(response.statusCode).toBe(401);
			expect(response.body.errors[0].msg).toBe(
				"Password not provided"
			);
		});

		it("should return 401 Email not provided when email not sent", async () => {
			const response = await request(app).post(route).send({
				password: "password"
			});
			expect(response.statusCode).toBe(401);
			expect(response.body.errors[0].msg).toBe("Email not valid");
		});

		it("should return 401 if email is not correct", async () => {
			const response = await request(app).post(route).send({
				email: "testgmail.com",
				password: "password"
			});
			expect(response.statusCode).toBe(401);
			expect(response.body.errors[0].msg).toBe("Email not valid");
		});
	});
