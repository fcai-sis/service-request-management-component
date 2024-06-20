import { Request, Response } from "express";
import ServiceRequestModel, {
  serviceRequestStatuses,
} from "../../data/models/serviceRequest.model";

type HandlerRequest = Request<{
  serviceRequestId: string;
}>;

/**
 * Completes a service request
 */
const completeServiceRequestHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { serviceRequestId } = req.params;

  const serviceRequest = await ServiceRequestModel.findById(serviceRequestId);

  if (!serviceRequest) {
    return res.status(404).json({
      error: {
        message: "Service request not found",
      },
    });
  }

  serviceRequest.status = serviceRequestStatuses[2];

  await serviceRequest.save();

  return res.status(200).json({
    message: "Service request has been completed",
    serviceRequest: {
      ...serviceRequest.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default completeServiceRequestHandler;
