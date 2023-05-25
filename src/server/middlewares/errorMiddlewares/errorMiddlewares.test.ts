import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalErrorMiddleware, notFoundError } from "./errorMiddlewares";

type CustomResponse = Pick<Response, "status" | "json">;

const response: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const request = {};
const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a notFoundError function", () => {
  describe("When it receives a next function", () => {
    test("Then it should call it with an error status code '404' ans message ' Sorry, endpoint notFound please check it'", () => {
      const customError = new CustomError(
        "Sorry, endpoint notfound please check it",
        404
      );

      notFoundError(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("Given a generalError function", () => {
    describe("When called with and an error", () => {
      test("Then it should call response with code 500 and json with message 'General error'", () => {
        const error = new Error("General error");
        const statusCode = 500;
        const { message } = error;
        generalErrorMiddleware(
          error as CustomError,
          request as Request,
          response as Response,
          next as NextFunction
        );

        expect(response.status).toHaveBeenCalledWith(statusCode);
        expect(response.json).toHaveBeenCalledWith({ message });
      });
    });
  });
});
