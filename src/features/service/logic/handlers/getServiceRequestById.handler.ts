import { Request, Response } from "express";
import ServiceRequestModel from "../../../service/data/models/serviceRequest.model";

/**
 * Get a service request by ID
 */

type HandlerRequest = Request<{ serviceRequestId: string }>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { serviceRequestId } = req.params;

  const serviceRequest = await ServiceRequestModel.findById(
    serviceRequestId
  ).populate({ path: "studentId", select: "fullName" });

  if (!serviceRequest) {
    return res.status(404).json({
      error: {
        message: "Service request not found",
      },
    });
  }

  const response = {
    serviceName: serviceRequest.serviceName,
    status: serviceRequest.status,
    student: serviceRequest.studentId,
    message: serviceRequest.message,
    createdAt: serviceRequest.createdAt,
    claimAt: serviceRequest.claimAt,
  };

  return res.status(200).json(response);
};

const getServiceRequestByIdHandler = handler;

export default getServiceRequestByIdHandler;
