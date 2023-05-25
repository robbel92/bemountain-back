import { type Request, type Response } from "express";
import { type CustomResponse } from "../../types";
import pingController from "./pingController";

describe("Given a pingController ", () => {
  describe("When it receives a request and response", () => {
    test("Then it should call method status with 200 and method json with a message 'Ping OK' ", () => {
      const req = {};
      const expectedCode = 200;
      const expectedMessage = "Ping OK";

      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
