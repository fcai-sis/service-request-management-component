import { Request, Response } from "express";
import ServiceRequestModel, {
  serviceRequestStatuses,
} from "../../data/models/serviceRequest.model";
import { cloudinary } from "../../../../database";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import { StudentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {
    serviceName: string;
    message: string;
    user: TokenPayload;
  }
>;

/**
 * Creates a new service request
 */
const createServiceRequestHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  console.log(JSON.stringify(req.body));

  const { serviceName, message, user } = req.body;
  const image = req.file;

  // Ensure an image attachment was provided
  if (!image) {
    res.status(400).json({
      summary: "Bad Request",
      details: "No image attachment was provided in the request body",
    });
    return;
  }
  // Upload the strategy to cloudinary
  const uploadResult = await cloudinary.uploader.upload(image.path, {
    folder: "attachments",
    resource_type: "raw",
  });

  const student = await StudentModel.findOne({ userId: user.userId });

  if (!student) {
    res.status(404).json({
      summary: "Not Found",
      details: "Student not found",
    });
    return;
  }

  const serviceRequest = new ServiceRequestModel({
    serviceName,
    status: serviceRequestStatuses[0],
    student: student._id,
    image: uploadResult.secure_url,
    message,
    createdAt: new Date(),
  });

  await serviceRequest.save();

  const response = {
    message: "Service request created successfully",
    service: serviceRequest,
  };

  return res.status(201).json(response);
};

export default createServiceRequestHandler;
