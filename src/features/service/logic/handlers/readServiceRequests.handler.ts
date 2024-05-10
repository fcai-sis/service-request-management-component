import { Request, Response } from "express";
import ServiceRequestModel from "../../../service/data/models/serviceRequest.model";

/**
 * Get all service requests
 */

type HandlerRequest = Request;

const handler = async (req: HandlerRequest, res: Response) => {
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  const serviceRequests = await ServiceRequestModel.find(
    {},
    {
      __v: 0,
      // _id: 0,
    }
  )
    .populate({
      path: "studentId",
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

const readServiceRequestsHandler = handler;
export default readServiceRequestsHandler;
