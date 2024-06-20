import * as validator from "express-validator";
import { serviceRequestStatuses } from "../../data/models/serviceRequest.model";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

const filterationQueryParamsMiddleware = [
  validator
    .query("status")

    .optional()

    .isString()
    .withMessage("Status must be a string")

    .isIn(serviceRequestStatuses)
    .withMessage("Invalid status"),

  validateRequestMiddleware,
];

export default filterationQueryParamsMiddleware;
