import { type NextFunction, type Response } from "express";
import { routeAddMock } from "../../../../mocks/routesMocks/routesMocks";
import { type CustomRequestModify } from "../../types";
import { modifyRoute } from "../routeControllers";
import { type CustomResponse } from "../../../types";
import Route from "../../../database/models/Route";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a modifyRoute controller", () => {
  const next = jest.fn();

  const req: Partial<CustomRequestModify> = {
    userId: "648055e6bd1592493e0639eb",
    body: routeAddMock,
  };

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a request with a valid route on body, a response ans next function", () => {
    test("Then it should call status response method with status code '200' and json response method with the route modified", async () => {
      const expectedCode = 200;

      Route.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(routeAddMock),
      });

      await modifyRoute(
        req as CustomRequestModify,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith({ route: routeAddMock });
    });
  });
  describe("When it receives a request with a invalid route on body, a response and next function", () => {
    test("Then it should calls the next function with an error 'Could not update the desired route'", async () => {
      const error = new Error("Could not update the desired route");

      Route.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await modifyRoute(
        req as CustomRequestModify,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
