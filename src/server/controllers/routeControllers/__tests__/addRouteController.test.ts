import { type NextFunction, type Response } from "express";
import { routeAddMock } from "../../../../mocks/routesMocks/routesMocks";
import { type CustomRequestAdd } from "../../types";
import { addRoute } from "../routeControllers";
import { type CustomResponse } from "../../../types";
import Route from "../../../database/models/Route";
import CustomError from "../../../../CustomError/CustomError";

describe("Given a addRoute controller", () => {
  const next = jest.fn();

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request with valid route on body, a response and next function", () => {
    test("Then it should call status response method with status code '200' and json response method with the route create ", async () => {
      const expectedCode = 200;

      const req: Partial<CustomRequestAdd> = {
        userId: "648055e6bd1592493e0639eb",
        body: {
          route: routeAddMock,
        },
      };

      Route.create = jest.fn().mockReturnValue(routeAddMock);

      await addRoute(
        req as CustomRequestAdd,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith({ route: routeAddMock });
    });
  });
  describe("When it receives a request with invalid route on body,  a response and next function", () => {
    test("Then it should call next function with error 'Could not add the desired route ", async () => {
      const req: Partial<CustomRequestAdd> = {
        userId: "648055e6bd1592493e0639eb",
        body: {
          route: routeAddMock,
        },
      };
      const error = new CustomError("Could not add the desired route", 404);

      Route.create = jest
        .fn()
        .mockRejectedValue(new CustomError("Sorry, failed to add route", 404));
      await addRoute(
        req as CustomRequestAdd,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
