import request from 'supertest';
import app from '../config/app.js';
import dotenv from "dotenv";
import { connectDB, closeDB } from "../config/db.js";

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
        // should respont with a json object
        // should save user to the mongodb database

        // test("Should respond with a 200 status code", async () => {
        //     const res = await supertest(app).get("/api/subjects");
        //     expect(res.status).toBe(200);
        // });

        test("Should respond with a 200 status code", async () => {
            const res = await request(app)
            .post("/api/users/login")
            .send({
                email: "email",
                password: "password",
            })
            .expect(200);

            token = res.body.token;
            expect(res.statusCode).toBe(200);
        });

        // test("Should respond with a 200 staus code", async () => {
        //     const res = await request(app)
        //     .post("/api/users/register")
        //     .send({
        //         name: "testName",
        //         surname: "testSurname",
        //         email: "testEmail@gmail.com",
        //         password: "testPassword",
        //         // Atm. hardcoded album
        //         album: "32323",
        //         role: "student",
        //         course: "62a4fabc16290c03fca3fa7e"
        //     });
            
        //     console.log(res.body);

        //     expect(res.statusCode).toBe(201);
        // });

        // test("Should respond with a 200 staus code", async () => {
        //     const res = await request(app).post("/api/subjects/").send({
        //         name: "test",
        //         type: "test",
        //         hours: "14",
        //         ects: 14,
        //         credit: "test",
        //         lecturer: mongoose.Types.ObjectId("627d50ce7238585afa0c1faf"),
        //     });
            
        //     console.log("BODY"- res.body);

        //     expect(res.statusCode).toBe(201);
        // });

        // test("Should respond with a 200 status code", async () => {
        //     const res = await request(app).get("/api/users");
        //     console.log(res.body);
        //     expect(res.statusCode).toBe(200);
        // });

        afterAll(done => {
            // Closing the DB connection allows Jest to exit successfully.
            closeDB();
            done();
          })
    });
})