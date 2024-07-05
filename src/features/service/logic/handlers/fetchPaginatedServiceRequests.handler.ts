import paginate from "express-paginate";
import { Request, Response } from "express";
import { ServiceRequestModel } from "@fcai-sis/shared-models";
import { asyncHandler } from "@fcai-sis/shared-utilities";

type HandlerRequest = Request;

/**
 * Get all service requests
 */
const fetchServiceRequestsHandler = [
  paginate.middleware(),
  asyncHandler(async (req: HandlerRequest, res: Response) => {
    const status = req.query.status;
    const filter = { ...(status && { status }) };

    const serviceRequests = await ServiceRequestModel.find(
      filter,
      {},
      {
        sort: { createdAt: -1 },
      }
    )
      .populate({
        path: "student",
        select: "fullName studentId -_id",
      })
      .skip(Number(req.query.skip) ?? 0)
      .limit(req.query.limit as unknown as number);

    // Count the total number of service requests
    const totalServiceRequests = await ServiceRequestModel.countDocuments(
      filter
    );

    return res.status(200).json({
      serviceRequests: serviceRequests,
      totalServiceRequests: totalServiceRequests,
      page: req.query.page,
      limit: req.query.limit,
    });
  }),
];

export default fetchServiceRequestsHandler;
