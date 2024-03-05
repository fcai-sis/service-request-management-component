import { Request, Response } from "express";

import ServiceModel from "../../data/models/service.model";

/**
 * An example handler that creates an example document in the database
 */

type HandlerRequest = Request<{}, {}, { name: string; description: string }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { name, description } = req.body;

  const service = await ServiceModel.create({ name, description });

  res.status(201).json({ service });
};

export default handler;
