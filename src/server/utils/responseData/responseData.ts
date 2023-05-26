import CustomError from "../../../CustomError/CustomError.js";
import { type ErrorStructure } from "./types";

export const responseErrorData: ErrorStructure = {
  wrongCredentials: new CustomError("Wrong credentials please,check it", 401),
  endpointNotFound: new CustomError(
    "Sorry, endpoint not found, please check it",
    404
  ),
  notValidToken: new CustomError(
    "Not token or not valid token, please check it",
    401
  ),
  missingToken: new CustomError("Missing token, please check it", 401),
};
