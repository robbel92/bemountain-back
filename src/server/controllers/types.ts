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
  authorName: string;
  authorImage: string;
  description: string;
  difficulty: string;
  distance: number;
  ubication: string;
  photo: string;
  elevationGain: number;
  id: string;
}

export interface CustomRequest extends Request {
  userId: string;
}

export interface CustomParamsRequest extends Request {
  userId: string;
  params: {
    routeId: string;
  };
}

export interface CustomRequestQuerys extends Request {
  query: {
    limit: string;
    skip: string;
  };
}

export interface CustomRequestAdd extends Request {
  userId: string;
  body: {
    route: RouteStructure;
  };
}
