import { Request, Response } from "express";
import { ServiceRequestModel } from "@fcai-sis/shared-models";

/**
 * Get a service request by ID
 */
type HandlerRequest = Request<{ serviceRequestId: string }>;

const fetchServiceRequestByIdHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { serviceRequestId } = req.params;

  const serviceRequest = await ServiceRequestModel.findById(
    serviceRequestId
  ).populate({ path: "student", select: "fullName studentId -_id" });

  if (!serviceRequest) {
    return res.status(404).json({
      error: {
        message: "Service request not found",
      },
    });
  }

  return res.status(200).json({
    serviceRequest: {
      ...serviceRequest.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default fetchServiceRequestByIdHandler;
