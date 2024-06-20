import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";
import * as validator from "express-validator";

const ensureServiceRequestIdInParamsMiddleware = [
  validator
    .param("serviceRequestId")

    .exists()
    .withMessage("Service Request ID is required")

    .isMongoId()
    .withMessage("Service Request ID must be a valid Mongo ID"),

  validateRequestMiddleware,
];

export default ensureServiceRequestIdInParamsMiddleware;
