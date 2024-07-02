import { Request, Response } from "express";
import {
  ServiceRequestModel,
  ServiceRequestStatusEnum,
} from "@fcai-sis/shared-models";
import { cloudinary } from "../../../../database";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import { StudentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {
    serviceName: string;
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
  const { serviceName, user } = req.body;
  const image = req.file;

  // Ensure an image attachment was provided
  if (!image) {
    res.status(400).json({
      errors: [
        {
          summary: "Bad Request",
          message: "No image attachment was provided in the request body",
        },
      ],
    });
    return;
  }
  // Upload the strategy to cloudinary
  const uploadResult = await cloudinary.uploader.upload(image.path, {
    folder: "attachments",
    resource_type: "raw",
  });

  const student = await StudentModel.findOne({ user: user.userId });

  if (!student) {
    res.status(404).json({
      errors: [
        {
          message: "Student not found",
        },
      ],
    });
    return;
  }

  const createdServiceRequest = await ServiceRequestModel.create({
    serviceName,
    status: ServiceRequestStatusEnum[0],
    student: student._id,
    image: uploadResult.secure_url,
  });

  return res.status(201).json({
    message: "Service request created successfully",
    serviceRequest: {
      ...createdServiceRequest.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default createServiceRequestHandler;
