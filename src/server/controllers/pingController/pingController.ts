import { type Response, type Request } from "express";

const pingController = (req: Request, res: Response) => {
  res.status(200).json({ message: "Ping OK" });
};

export default pingController;
