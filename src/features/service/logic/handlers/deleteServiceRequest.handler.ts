import { Request, Response } from "express";
import { ServiceRequestModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<{
  serviceRequestId: string;
}>;

/**
 * Handler for deleting a service request
 */
const deleteServiceRequestHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { serviceRequestId } = req.params;

  const serviceRequest = await ServiceRequestModel.findByIdAndDelete(
    serviceRequestId
  );

  if (!serviceRequest) {
    return res.status(404).json({
      errors: [
        {
          message: "Service request not found",
        },
      ],
    });
  }

  return res.status(200).json({
    message: "Service request deleted successfully",
    serviceRequest: {
      ...serviceRequest.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default deleteServiceRequestHandler;
