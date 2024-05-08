import { Request, Response } from "express";
import ServiceRequestModel, {
} from "../../data/models/serviceRequest.model";

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
    message?: string;
  }
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { serviceRequestId } = req.params;
  const { claimAt, message } = req.body;

  const serviceRequest = await ServiceRequestModel.findByIdAndUpdate(
    serviceRequestId,
    {
      status: "in progress",
      claimAt,
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
    message: "Service request accepted successfully",
    service: {
      serviceName: serviceRequest.serviceName,
      status: serviceRequest.status,
      student: serviceRequest.studentId,
      message: serviceRequest.message,
      createdAt: serviceRequest.createdAt,
      claimAt: serviceRequest.claimAt,
    },
  };

  return res.status(200).json(response);
};

const acceptServiceRequestHandler = handler;

export default acceptServiceRequestHandler;
