import { Request, Response } from "express";
import ServiceRequestModel from "../../data/models/serviceRequest.model";

/**
 * Handler for updating a service request
 */

type HandlerRequest = Request<
  {
    serviceRequestId: string;
  },
  {},
  {
    serviceName?: string;
    status?: string;
    message?: string;
    claimAt?: Date;
  }
>;

const handler = async (req: HandlerRequest, res: Response) => {
  const { serviceRequestId } = req.params;
  const { serviceName, status, message, claimAt } = req.body;

  const serviceRequest = await ServiceRequestModel.findByIdAndUpdate(
    serviceRequestId,
    {
      ...(serviceName && { serviceName }),
      ...(status && { status }),
      ...(message && { message }),
      ...(claimAt && { claimAt }),
    },
    {
      new: true,
    }
  );

  if (!serviceRequest) {
    return res.status(404).json({
      error: {
        message: "Service request not found",
      },
    });
  }
  await serviceRequest.save();

  const response = {
    message: "Service request updated successfully",
    service: {
      serviceName: serviceRequest.serviceName,
      status: serviceRequest.status,
      student: serviceRequest.studentId,
      message: serviceRequest.message,
      createdAt: serviceRequest.createdAt,
      claimAt: serviceRequest.claimAt,
    },
  };

  return res.status(200).json(response);
};

const updateServiceRequestHandler = handler;
export default updateServiceRequestHandler;
