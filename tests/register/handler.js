const request = require("supertest");
const app = require("../../src/app");
const sequelize = require("../../src/utils/db");

module.exports = () =>
	describe("test controller", () => {
		let db = sequelize;

		beforeAll(async () => {
			await db.sync({ force: true });
		});

		const route = "/register";

		it("should return 201 when a user is registered", async () => {
			const response = await request(app).post(route).send({
				email: "test@gmail.com",
				name: "test",
				password: "password"
			});
			expect(response.statusCode).toBe(201);
			expect(response.body.msg).toBe("User successfully created");
		});

		afterAll(async () => {
			await db.close();
		});
	});
