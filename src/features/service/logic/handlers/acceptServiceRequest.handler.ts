import { Request, Response } from "express";
import {
  ServiceRequestModel,
  ServiceRequestStatusEnum,
} from "@fcai-sis/shared-models";
import env from "../../../../env";

/**
 * Handler for accepting a service request
 */
type HandlerRequest = Request<
  {
    serviceRequestId: string;
  },
  {},
  {
    claimAt: Date;
  }
>;

const acceptServiceRequestHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { serviceRequestId } = req.params;
  const { claimAt } = req.body;

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

  serviceRequest.status = ServiceRequestStatusEnum[1];
  serviceRequest.claimAt = claimAt;

  await serviceRequest.save();

  const formattedClaimAt = new Date(claimAt).toLocaleString();

  await fetch(`${env.MAIL_API_URL}/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: "Service request accepted",
      text: `Your service request has been accepted, please remember to show up on time ${formattedClaimAt} `,
    }),
  });

  return res.status(200).json({
    message: "Service request accepted successfully",
    serviceRequest: {
      ...serviceRequest.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default acceptServiceRequestHandler;
