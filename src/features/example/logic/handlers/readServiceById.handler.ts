import { Request, Response } from "express";

import ServiceModel from "../../data/models/service.model";

/**
 * An example handler that creates an example document in the database
 */

type HandlerRequest = Request<{ id: string }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const service = await ServiceModel.findById(req.params.id);

  if (!service) {
    return res.status(404).send({
      error: {
        message: "Service not found",
      },
    });
  }

  res.status(200).json({ service });
};

export default handler;
