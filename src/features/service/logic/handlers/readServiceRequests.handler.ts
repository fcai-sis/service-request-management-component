import { Request, Response } from "express";
import ServiceRequestModel from "../../../service/data/models/serviceRequest.model";

/**
 * Get all service requests
 */

type HandlerRequest = Request;

const handler = async (req: HandlerRequest, res: Response) => {
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  const serviceRequests = await ServiceRequestModel.find()
    .populate({
      path: "studentId",
      select: "fullName -_id",
    })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const response = {
    serviceRequests: serviceRequests.map((serviceRequest) => ({
      serviceName: serviceRequest.serviceName,
      status: serviceRequest.status,
      student: serviceRequest.studentId,
      message: serviceRequest.message,
      createdAt: serviceRequest.createdAt,
      claimAt: serviceRequest.claimAt,
    })),
    page: page,
    pageSize: pageSize,
  };

  return res.status(200).json(response);
};

const readServiceRequestsHandler = handler;
export default readServiceRequestsHandler;
