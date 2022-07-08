const request = require("supertest");
const app = require("../src/app");

describe("CHECK a random route", () => {
	it("GET /random", async () => {
		const response = await request(app).get("/random");
		expect(response.statusCode).toBe(400);
	});
});
