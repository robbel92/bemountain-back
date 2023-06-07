import "../loadEnvironment.js";
import request from "supertest";
import app from "../app";
import { mockRoutes } from "../../mocks/routesMocks/routesMocks.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../database/connectToDatabase";
import mongoose from "mongoose";
import Route from "../database/models/Route";
import { tokenMock } from "../../mocks/userMocks/userMocks.js";

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
  await Route.deleteMany();
});

describe("Given a GET '/routes' endpoint", () => {
  beforeEach(async () => {
    await Route.create(mockRoutes);
  });
  describe("When it recevies a request with authorization header with a valid Bearer token", () => {
    test("Then it should respond a status 200 and collection of routes", async () => {
      const statusCodeExpected = 200;
      const response = await request(app)
        .get("/routes")
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeExpected);

      expect(response.body).toHaveLength(2);
    });
  });
});

describe("Given a DELETE '/routes/:routeId'", () => {
  describe("When it receives a request with param routeId valid ", () => {
    beforeEach(async () => {
      await Route.create(mockRoutes);
    });

    test("Then it should respond a status 200 and message 'The route has been successfully deleted'", async () => {
      const statusCodeExpected = 200;
      const expectedMessage = "The route has been successfully deleted";

      const routes = await Route.find().exec();

      const response = await request(app)
        .delete(`/routes/${routes[0]._id.toString()}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCodeExpected);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
