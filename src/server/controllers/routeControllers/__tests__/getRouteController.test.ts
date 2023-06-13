import { type NextFunction, type Response } from "express";
import { type CustomResponse } from "../../../types";
import { type CustomParamsRequest } from "../../types";
import { getRoute } from "../routeControllers";
import Route from "../../../database/models/Route";
import { routeAddMock } from "../../../../mocks/routesMocks/routesMocks";
import { Types } from "mongoose";
import CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getRoute controller", () => {
  const req: Partial<CustomParamsRequest> = {
    userId: "idUser",
    params: { routeId: "idRoute" },
  };

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();
  describe("When it receives a request with an existing route id , a response and next function", () => {
    test("Then it should call status response method with status '200' and json method  with the route belonging to the id received in the request", async () => {
      const expectedCode = 200;

      Route.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(routeAddMock),
      });

      await getRoute(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith({ route: routeAddMock });
    });
  });

  describe("When it receives a request with a invalid id route, a response and a next next function", () => {
    test("Then it should call next function with error, status code '404' and message 'Could not give the desired route'", async () => {
      const invalidRouteId = new Types.ObjectId().toString();
      const expectedCode = 404;
      const expectedMessage = "Could not give the desired route";
      const error = new CustomError(expectedMessage, expectedCode);

      const req: Partial<CustomParamsRequest> = {
        userId: "idUser",
        params: { routeId: invalidRouteId },
      };

      Route.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await getRoute(req as CustomParamsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
