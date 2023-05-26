import { type Request } from "express";

export type UserCredentialsRequest = Request<
  Record<string, any>,
  Record<string, any>,
  UserCredentials
>;

export interface UserCredentials {
  username: string;
  password: string;
}

export interface RouteStructure {
  name: string;
  author: string;
  description: string;
  difficulty: string;
  distance: number;
  ubication: string;
  photo: string;
  elevationGain: number;
  id: string;
}
