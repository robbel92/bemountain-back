import "../loadEnvironment.js";
import request from "supertest";
import app from "../app";
import { mockRoutes } from "../../mocks/routesMocks/routesMocks.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../database/connectToDatabase";
import mongoose from "mongoose";
import Route from "../database/models/Route";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmNmY3YmFmOWExOTg4MjBjYWY5OGEiLCJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTY4NTY0MDMzOSwiZXhwIjoxNjg1NzI2NzM5fQ.N_w91lpdeL3N78F606nFM2gqVAIHWkfkSXXP8u-lU0Y";

describe("Given a GET '/routes' endpoint", () => {
  beforeEach(async () => {
    await Route.create(mockRoutes);
  });
  describe("When it recevies a request with authorization header with a valid Bearer token", () => {
    test("Then it should respond a status 200 and collection of routes", async () => {
      const statusCodeExpected = 200;
      const response = await request(app)
        .get("/routes")
        .set("Authorization", `Bearer ${token}`)
        .expect(statusCodeExpected);

      expect(response.body).toHaveLength(2);
    });
  });
});
