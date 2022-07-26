const request = require("supertest");
const app = require("../../src/app");

module.exports = (data) =>
	describe("validate the request", () => {
		const route = "/user/register";

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
			expect(response.body.errors[0].msg).toBe("Email not provided");
		});

		it("should return 401 if email is not correct", async () => {
			const response = await request(app).post(route).send({
				email: "testgmail.com",
				name: "test",
				password: "password"
			});
			expect(response.statusCode).toBe(401);
			expect(response.body.errors[0].msg).toBe("Email not valid");
		});

		it("returns 401 if name not provided", async () => {
			const response = await request(app).post(route).send({
				email: "test@gmail.com",
				password: "password"
			});
			expect(response.statusCode).toBe(401);
			expect(response.body.errors[0].msg).toBe("Name not provided");
		});

		it("returns 401 if name is empty", async () => {
			const response = await request(app).post(route).send({
				email: "test@gmail.com",
				name: "",
				password: "password"
			});
			expect(response.statusCode).toBe(401);
			expect(response.body.errors[0].msg).toBe("Name not provided");
		});

		it("should return 401 Email already in use when user is already registered", async () => {
			let response = await request(app).post(route).send({
				email: "email@gmail.com",
				name: "email",
				username: "user",
				password: "password"
			});
			response = await request(app).post(route).send({
				email: "email@gmail.com",
				name: "email",
				username: "user1",
				password: "password"
			});
			expect(response.statusCode).toBe(401);
			expect(response.body.errors[0].msg).toBe(
				"E-mail already in use"
			);
		});
	});
