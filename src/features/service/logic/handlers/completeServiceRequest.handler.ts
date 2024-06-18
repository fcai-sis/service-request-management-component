import { Request, Response } from "express";
import ServiceRequestModel, {
  serviceRequestStatuses,
} from "../../data/models/serviceRequest.model";

type HandlerRequest = Request<
  {
    serviceRequestId: string;
  },
  {},
  {}
>;

/**
 * Completes a service request
 */
const completeServiceRequestHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { serviceRequestId } = req.params;

  const serviceRequest = await ServiceRequestModel.findByIdAndUpdate(
    serviceRequestId,
    {
      status: serviceRequestStatuses[2],
    },
    {
      new: true,
    }
  );

  if (!serviceRequest) {
    return res.status(404).json({
      error: {
        message: "Service request not found",
      },
    });
  }
  await serviceRequest.save();

  const response = {
    message: "Service request has been completed",
    service: {
      serviceName: serviceRequest.serviceName,
      status: serviceRequest.status,
      student: serviceRequest.student,
      message: serviceRequest.message,
      createdAt: serviceRequest.createdAt,
      claimAt: serviceRequest.claimAt,
    },
  };

  return res.status(200).json(response);
};

export default completeServiceRequestHandler;
