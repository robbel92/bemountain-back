import type CustomError from "../../../CustomError/CustomError";

export interface ErrorStructure {
  endpointNotFound: CustomError;
  wrongCredentials: CustomError;
}
