import { type Response, type Request } from "express";

export type CustomResponse = Pick<Response, "json" | "status">;
export type CustomRequestHeader = Pick<CustomRequest, "header" | "userId">;
export interface CustomRequest extends Request {
  userId: string;
}

export interface UserStructure {
  _id: string;
  username: string;
  password: string;
}

export interface UserDataStructure {
  name: string;
  username: string;
  password: string;
  image: string;
  email: string;
}
export interface UserLoginStructure {
  username: string;
  password: string;
}
