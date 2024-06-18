import { Request, Response } from "express";
import ServiceRequestModel, {
  serviceRequestStatuses,
} from "../../data/models/serviceRequest.model";

/**
 * Handler for rejecting a service request
 */

type HandlerRequest = Request<
  {
    serviceRequestId: string;
  },
  {},
  {
    message: string;
  }
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { serviceRequestId } = req.params;
  const { message } = req.body;

  const serviceRequest = await ServiceRequestModel.findByIdAndUpdate(
    serviceRequestId,
    {
      status: serviceRequestStatuses[3],
      message,
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
    message: "Service request has been rejected",
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

const rejectServiceRequestHandler = handler;

export default rejectServiceRequestHandler;
