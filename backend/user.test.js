import supertest from 'supertest';
import app from './config/server';


describe("POST /api/users", () => {
    describe("All fields are given", () => {
        // should respond with a 200 status code
        // should respont with a json object
        // should save user to the mongodb database
        test("Should respond with a 200 staus code", async () => {
            const res = await request(app)
            .post("/api/users/register")
            .send({
                name: "testName",
                surname: "testSurname",
                email: "testEmail@gmail.com",
                password: "testPassword",
                // Atm. hardcoded album
                album: "32323",
                role: "student",
                course: "62a4fabc16290c03fca3fa7e"
            });
            
            expect(response.code).toBe(200);
        });
    });
})