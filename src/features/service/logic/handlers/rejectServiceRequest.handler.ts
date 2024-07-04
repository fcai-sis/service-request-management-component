import { Request, Response } from "express";
import {
  ServiceRequestModel,
  ServiceRequestStatusEnum,
} from "@fcai-sis/shared-models";
import env from "../../../../env";
/**
 * Handler for rejecting a service request
 */
type HandlerRequest = Request<
  {
    serviceRequestId: string;
  },
  {},
  {
    message: string;
  }
>;

const rejectServiceRequestHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { serviceRequestId } = req.params;
  const { message } = req.body;

  const serviceRequest = await ServiceRequestModel.findById(serviceRequestId);

  if (!serviceRequest) {
    return res.status(404).json({
      errors: [
        {
          message: "Service request not found",
        },
      ],
    });
  }

  serviceRequest.status = ServiceRequestStatusEnum[3];
  serviceRequest.message = message;

  await serviceRequest.save();

  await fetch(`${env.MAIL_API_URL}/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: "Service request rejected",
      text: `Your service request has been rejected with the following message: ${message}`,
    }),
  });

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
