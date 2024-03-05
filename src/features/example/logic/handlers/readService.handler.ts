import { Request, Response } from "express";

import ServiceModel from "../../data/models/service.model";

/**
 * An example handler that creates an example document in the database
 */

type HandlerRequest = Request;

const handler = async (req: HandlerRequest, res: Response) => {
  const service = await ServiceModel.find();

  res.status(200).json({ service });
};

export default handler;
