import { type Request } from "express";

export type UserCredentialsRequest = Request<
  Record<string, any>,
  Record<string, any>,
  { username: string; password: string }
>;

export interface CustomRequest extends Request {
  userId: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}
