import { type NextFunction, type Response } from "express";
import type { CustomResponse } from "../../../types";
import { getRoutes } from "../routeControllers";
import Route from "../../../database/models/Route";
import { mockRoutes } from "../../../../mocks/routesMocks/routesMocks";
import { type CustomRequestQuerys } from "../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getRoutes controller", () => {
  const next = jest.fn();

  const req = {
    query: {
      limit: 10,
      skip: 20,
    },
  };

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a request a response and next function", () => {
    test("Then it should call status response method with status code '200' and json response method with collection of routes", async () => {
      const expectedCode = 200;

      Route.find = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockRoutes),
          }),
        }),
      });

      await getRoutes(
        req as unknown as CustomRequestQuerys,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedCode);
    });
  });
  describe("When the exec method of find rejects and throw error ", () => {
    test("Then it should call the next function with error", async () => {
      const error = new Error("Error connecting database to get routes");

      Route.find = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockRejectedValue(error),
          }),
        }),
      });

      await getRoutes(
        req as unknown as CustomRequestQuerys,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
