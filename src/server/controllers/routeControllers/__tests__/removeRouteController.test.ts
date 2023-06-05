import Route from "../../../database/models/Route";
import { type CustomResponse } from "../../../types";
import { type CustomParamsRequest, type CustomRequest } from "../../types";
import { Types } from "mongoose";
import { removeRoute } from "../routeControllers";
import { type Response, type NextFunction } from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a removeRoute controller", () => {
  const next: NextFunction = jest.fn();

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const routeId = new Types.ObjectId().toString();
  const userId = new Types.ObjectId().toString();

  const req: Partial<CustomRequest> = {
    params: {
      routeId,
    },
    userId,
  };
  describe("When it receives a request with an existing Route id , a response and next function", () => {
    test("Then it should call status response method with status code '200' and json method with message 'The route has been successfully deleted'", async () => {
      const expectedCode = 200;
      const expectedMessage = "The route has been successfully deleted";

      Route.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(routeId),
      });
      Route.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(routeId),
      });

      await removeRoute(req as CustomParamsRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
  describe("When it receives a request with an invalid Route id, a response and next function", () => {
    test("Then it should call status response method with status code 400 and json method with message 'The route you want to delete does not exist'", async () => {
      const invalidRouteId = new Types.ObjectId().toString();
      const expectedCode = 404;
      const expectedMessage = "The route you want to delete does not exist";

      const req: Partial<CustomParamsRequest> = {
        params: {
          routeId,
        },
        userId: invalidRouteId,
      };

      Route.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await removeRoute(req as CustomParamsRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
  describe("When it receives a request with an invalid Route id, a response and next function and connection database failed", () => {
    test("Then it should call the next function with the error 'Error connecting database to remove route'", async () => {
      const expectedError = new Error(
        "Error connecting database to remove route"
      );

      Route.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await removeRoute(req as CustomParamsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
