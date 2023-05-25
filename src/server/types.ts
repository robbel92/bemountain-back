import { type Response } from "express";

export type CustomResponse = Pick<Response, "json" | "status">;

export interface UserStructure {
  _id: string;
  username: string;
  password: string;
}
