import { Request, Response } from "express";
import ServiceRequestModel, {
  serviceRequestStatuses,
} from "../../data/models/serviceRequest.model";

/**
 * Handler for rejecting a service request
 */
type HandlerRequest = Request<
  {
    serviceRequestId: string;
  },
  {},
  {
    serviceRequst: { message: string };
  }
>;

const rejectServiceRequestHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { serviceRequestId } = req.params;
  const {
    serviceRequst: { message },
  } = req.body;

  const serviceRequest = await ServiceRequestModel.findById(serviceRequestId);

  if (!serviceRequest) {
    return res.status(404).json({
      error: {
        message: "Service request not found",
      },
    });
  }

  serviceRequest.status = serviceRequestStatuses[3];
  serviceRequest.message = message;

  await serviceRequest.save();

  const response = {
    message: "Service request has been rejected",
    serviceRequest: {
      ...serviceRequest.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  };

  return res.status(200).json(response);
};

export default rejectServiceRequestHandler;
