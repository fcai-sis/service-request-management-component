import { Request, Response } from "express";
import ServiceRequestModel, {
  ServiceStatusType,
} from "../../data/models/serviceRequest.model";
import { cloudinary } from "../../../../database";

/**
 * Handler for creating a new service request
 */

type HandlerRequest = Request<
  {},
  {},
  {
    serviceName: string;
    studentId: string;
    message: string;
  }
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { serviceName, studentId, message } = req.body;
  const imgAttachment = req.file;

  // Ensure an image attachment was provided
  if (!imgAttachment) {
    res.status(400).json({
      summary: "Bad Request",
      details: "No image attachment was provided in the request body",
    });
    return;
  }
  // Upload the strategy to cloudinary
  const uploadResult = await cloudinary.uploader.upload(imgAttachment.path, {
    folder: "attachments",
    resource_type: "raw",
  });

  const service = new ServiceRequestModel({
    serviceName,
    status: "pending",
    studentId,
    imgAttachment: uploadResult.secure_url,
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
