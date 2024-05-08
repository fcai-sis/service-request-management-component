import { Request, Response } from "express";
import ServiceRequestModel, {
  ServiceStatusType,
} from "../../data/models/serviceRequest.model";

/**
 * Handler for creating a new service request
 */

type HandlerRequest = Request<
  {},
  {},
  {
    serviceName: string;
    status: ServiceStatusType;
    studentId: string;
    imgAttachment: string;
    message: string;
  }
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { serviceName, status, studentId, imgAttachment, message } = req.body;

  const service = new ServiceRequestModel({
    serviceName,
    status,
    studentId,
    imgAttachment,
    message,
    createdAt: new Date(),
  });

  await service.save();

  const response = {
    message: "Service request created successfully",
    service,
  };

  return res.status(201).json(response);
};

const createServiceRequestHandler = handler;

export default createServiceRequestHandler;
