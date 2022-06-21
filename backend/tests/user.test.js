import request from 'supertest';
import app from '../config/app.js';
import dotenv from "dotenv";
import { connectDB, closeDB } from "../config/db.js";
import User from "../models/userModel.js"

describe("POST /api/users", () => {
    describe("All fields are given", () => {
        let token = "";
        beforeAll(done => {
            // Using the enviroment variables
            dotenv.config();
            // Connecting to MongoDB
            connectDB();
            done();
        })
        // should respond with a 200 status code
        // should respond with a json object
        // should save user to the mongodb database

        test("Should respond with a 200 code and have property Token", async () => {
            const res = await request(app)
                .post("/api/users/login")
                .send({
                    email: "email",
                    password: "password"
                });
            
            token = res.body.token;
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("token");

        });

        test("Should respond with a 200 status code", async () => {
            const res = await request(app)
                .get("/api/subjects")
                .set('Authorization', 'Bearer ' + token) 
            expect(res.status).toBe(200);
        });

        test("Should respond with a 200 code and call mock fn", async () => {
            const userData = {
                name: "testName",
                surname: "testSurname",
                email: "testEmail@gmail.com",
                password: "testPassword",
                // Atm. hardcoded album
                album: "32323",
                role: "student",
                course: "62ac9b99f5719540d152bcf4"
            };

            // Creating mock
            const userMock = jest.fn(() => userData)
            jest.spyOn(User, "create")
                .mockImplementation(() => userMock());

            const res = await request(app)
                .post("/api/users/register")
                .send(userData);
            
            expect(userMock).toHaveBeenCalledTimes(1);
            expect(res.status).toBe(201);
        });

        afterAll(done => {
            // Closing the DB connection allows Jest to exit successfully.
            closeDB();
            done();
          })
    });
})