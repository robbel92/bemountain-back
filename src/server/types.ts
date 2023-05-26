import { type Response } from "express";

export type CustomResponse = Pick<Response, "json" | "status">;

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
