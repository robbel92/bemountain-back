import { type NextFunction, type Response } from "express";

import jwt from "jsonwebtoken";

import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { type UserCredentialsRequest } from "../types";
import { type CustomResponse, type UserStructure } from "../../types";
import User from "../../database/models/User.js";
import { loginUser } from "./userControllers.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller", () => {
  const validUser = {
    password: "IsaiasM",
    username: "IsaiasM",
  };

  const req: Pick<UserCredentialsRequest, "body"> = {
    body: validUser,
  };

  bcrypt.compare = jest.fn().mockResolvedValue(true);

  const user: UserStructure = {
    _id: new Types.ObjectId().toString(),
    username: "IsaiasM",
    password: "$2y$10$MmNgcaFgPjkAgu8bxF3aceRkYJp7GZRH/IIpa9.aD8FfJojeOd/My",
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJJc2FpYXNNIiwiaWF0IjoxNTE2MjM5MDIyfQ.QfVddpDEQ72lpHqWFATDYSX4b0Kg60LzJIftmfDjtJw";

  User.findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(user),
  });

  jwt.sign = jest.fn().mockReturnValue(token);

  const expectedStatusCode = 200;

  const next = jest.fn();

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a request with a valid credentials", () => {
    test("Then it should call a response's status method with a status code 200", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
    test("Then it should call the response's method json with token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
  describe("When it receives a invalid credentials and next function", () => {
    test("Then it should call the next function with error 'Wrong credentials please,check it' and status 401", async () => {
      const error = new CustomError("Wrong credentials please,check it", 401);
      const invalidUser = {
        password: "IsaiasM",
        username: "IsiasM",
      };

      const reqInvalid: Pick<UserCredentialsRequest, "body"> = {
        body: invalidUser,
      };
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      await loginUser(
        reqInvalid as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
