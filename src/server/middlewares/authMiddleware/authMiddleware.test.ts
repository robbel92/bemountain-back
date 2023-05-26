import jwt from "jsonwebtoken";
import { type CustomRequest, type CustomRequestHeader } from "../../types";
import { type NextFunction, type Response } from "express";
import auth from "./authMiddleware";
import { responseErrorData } from "../../utils/responseData/responseData";

beforeEach(() => {
  jest.clearAllMocks();
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmNmY3YmFmOWExOTg4MjBjYWY5OGEiLCJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTY4NTExNzgwNywiZXhwIjoxNjg1MjA0MjA3fQ.M7_-qJxScXyE8UiznKmFv6mSuftU91dMUnnF863DuOA";

const req: CustomRequestHeader = {
  header: jest.fn().mockReturnValue(`Bearer ${token}`),
  userId: "",
};
const res = {};
const next = jest.fn();
jwt.verify = jest.fn().mockReturnValue({
  sub: "646f6f7baf9a198820caf98a",
  name: "Administrador",
  iat: 1685117807,
  exp: 1685204207,
});
describe("Given an authMiddleware", () => {
  describe("When it receives a header authorization with a valid token", () => {
    test("Then it should call the received next fucntion", () => {
      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives a header with a incorrect token and next function", () => {
    test("Then it should call the received next function with 401 'Not token or not valid token, please check it'", () => {
      const errorExpected = responseErrorData.notValidToken;
      errorExpected.name = "JsonWebTokenError";
      jwt.verify = jest.fn().mockImplementation(() => {
        throw errorExpected;
      });

      auth(req as CustomRequest, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(errorExpected);
    });
  });
  describe("When it receives a header with without token and next function", () => {
    test("Then it should call the received next function with 401 'Missing token, please check it'", () => {
      const errorExpected = responseErrorData.missingToken;
      jwt.verify = jest.fn().mockImplementation(() => {
        throw errorExpected;
      });
      const req: CustomRequestHeader = {
        header: jest.fn().mockReturnValue(`${token}`),
        userId: "",
      };

      auth(req as CustomRequest, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(errorExpected);
    });
  });
  describe("When it receives a header with without token and next function", () => {
    test("Then it should call the received next function with 401 'Missing token, please check it'", () => {
      const errorExpected = responseErrorData.missingToken;

      jwt.verify = jest.fn().mockImplementation(() => {
        throw errorExpected;
      });
      const req: CustomRequestHeader = {
        header: jest.fn().mockReturnValue(`${token}`),
        userId: "",
      };

      auth(req as CustomRequest, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalledWith(errorExpected);
    });
  });
});
