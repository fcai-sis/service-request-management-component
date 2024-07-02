import { Request, Response } from "express";
import {
  ServiceRequestModel,
  ServiceRequestStatusEnum,
} from "@fcai-sis/shared-models";

/**
 * Handler for accepting a service request
 */
type HandlerRequest = Request<
  {
    serviceRequestId: string;
  },
  {},
  {
    claimAt: Date;
  }
>;

const acceptServiceRequestHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { serviceRequestId } = req.params;
  const { claimAt } = req.body;

  const serviceRequest = await ServiceRequestModel.findById(serviceRequestId);

  if (!serviceRequest) {
    return res.status(404).json({
      errors: [
        {
          message: "Service request not found",
        },
      ],
    });
  }

  serviceRequest.status = ServiceRequestStatusEnum[1];
  serviceRequest.claimAt = claimAt;

  await serviceRequest.save();

  return res.status(200).json({
    message: "Service request accepted successfully",
    serviceRequest: {
      ...serviceRequest.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default acceptServiceRequestHandler;
