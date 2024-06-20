import paginate from "express-paginate";
import { Request, Response } from "express";
import { StudentModel } from "@fcai-sis/shared-models";
import { asyncHandler } from "@fcai-sis/shared-utilities";
import { TokenPayload } from "@fcai-sis/shared-middlewares";
import ServiceRequestModel from "../../data/models/serviceRequest.model";

type HandlerRequest = Request<{}, {}, { user: TokenPayload }>;

/**
 * Get current user's service requests
 */
const fetchMyServiceRequestsHandler = [
  paginate.middleware(),
  asyncHandler(async (req: HandlerRequest, res: Response) => {
    const { user } = req.body;

    const student = await StudentModel.findOne({ user: user.userId });

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
      .skip(req.skip ?? 0)
      .limit(req.query.limit as unknown as number);

    // Count the total number of service requests
    const totalServiceRequests = await ServiceRequestModel.countDocuments();

    const response = {
      serviceRequests: serviceRequests,
      totalServiceRequests: totalServiceRequests,
    };

    return res.status(200).json(response);
  }),
];

export default fetchMyServiceRequestsHandler;
