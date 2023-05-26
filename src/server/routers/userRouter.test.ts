import "../loadEnvironment.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../database/connectToDatabase.js";
import mongoose from "mongoose";
import User from "../database/models/User.js";
import { type UserCredentials } from "../controllers/types.js";
import { type UserDataStructure } from "../types.js";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

const mockUserLogin: UserCredentials = {
  username: "IsaiasM",
  password: "IsaiasM",
};
const mockUserInvalidLogin: UserCredentials = {
  username: "IsaiasM",
  password: "IsiasM",
};
const mockUserInvalidFormatLogin = {
  username: "IsaiasM",
  password: 321,
};

const mockUserHashed: UserDataStructure = {
  name: "Isaias Malvar",
  username: "IsaiasM",
  password: "$2y$10$MmNgcaFgPjkAgu8bxF3aceRkYJp7GZRH/IIpa9.aD8FfJojeOd/My",
  image: "",
  email: "isaias@bemount.es",
};

describe("Given a POST 'user/login' endpoint ", () => {
  beforeEach(async () => {
    await User.create(mockUserHashed);
  });
  describe("When it receives a request with username 'IsaiasM' and password 'IsaiasM'", () => {
    test("Then it should respond a status 200 and token", async () => {
      const expectedStatus = 200;

      const newUser = await User.findOne({
        username: mockUserLogin.username,
      }).exec();

      const response = await request(app)
        .post("/user/login")
        .send(mockUserLogin)
        .expect(expectedStatus);

      const payload = jwt.verify(
        response.body.token as string,
        process.env.JWT_SECRET!
      );

      const userId = payload.sub;

      expect(userId).toEqual(newUser?._id.toString());
    });
  });

  describe("When it receives a request with invalidi credentials username 'IsaiasM' and password 'IsiasM'", () => {
    test("Then it should respond a status 401 and message 'Wrong credentials please,check it'", async () => {
      const expectedStatus = 401;
      const expectedMessage = "Wrong credentials please,check it";

      const response = await request(app)
        .post("/user/login")
        .send(mockUserInvalidLogin)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request with invalid format credentials username 'Isaias' and password 123", () => {
    test("Then it should respond with status 400 and message 'password must be a string' ", async () => {
      const expectedStatus = 400;
      const expectedMessage = "password must be a string";

      const response = await request(app)
        .post("/user/login")
        .send(mockUserInvalidFormatLogin)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
