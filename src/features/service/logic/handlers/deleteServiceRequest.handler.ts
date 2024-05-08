import { Request, Response } from "express";
import ServiceRequestModel from "../../data/models/serviceRequest.model";

/**
 * Handler for deleting a service request
 */

type HandlerRequest = Request<
  {
    serviceRequestId: string;
  },
  {},
  {}
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { serviceRequestId } = req.params;

  const serviceRequest = await ServiceRequestModel.findByIdAndDelete(
    serviceRequestId
  );

  if (!serviceRequest) {
    return res.status(404).json({
      error: {
        message: "Service request not found",
      },
    });
  }

  return res.status(200).json({
    message: "Service request deleted successfully",
    deletedServiceRequest: {
      serviceName: serviceRequest.serviceName,
      status: serviceRequest.status,
      student: serviceRequest.studentId,
      message: serviceRequest.message,
      createdAt: serviceRequest.createdAt,
      claimAt: serviceRequest.claimAt,
    },
  });
};

const deleteServiceRequestHandler = handler;
export default deleteServiceRequestHandler;
