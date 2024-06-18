import { Request, Response } from "express";
import ServiceRequestModel from "../../data/models/serviceRequest.model";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import { StudentModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<{}, {}, { user: TokenPayload }>;

/**
 * Get current user's service requests
 */
const readMyServiceRequestsHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  const { user } = req.body;

  const student = await StudentModel.findOne({ userId: user.userId });

  if (!student) {
    return res.status(404).json({
      error: {
        message: "Student not found",
      },
    });
  }

  const serviceRequests = await ServiceRequestModel.find({
    student: student._id,
  })
    .populate({
      path: "student",
      select: "fullName studentId -_id",
    })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  // Count the total number of service requests
  const totalServiceRequests = await ServiceRequestModel.countDocuments();

  const response = {
    serviceRequests: serviceRequests,
    page: page,
    pageSize: pageSize,
    totalServiceRequests: totalServiceRequests,
  };

  return res.status(200).json(response);
};

export default readMyServiceRequestsHandler;
