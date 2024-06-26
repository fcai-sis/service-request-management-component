import * as validator from "express-validator";
import { ServiceRequestStatusEnum } from "@fcai-sis/shared-models";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

const filterationQueryParamsMiddleware = [
  validator
    .query("status")

    .optional()

    .isString()
    .withMessage("Status must be a string")

    .isIn(ServiceRequestStatusEnum)
    .withMessage("Invalid status"),

  validateRequestMiddleware,
];

export default filterationQueryParamsMiddleware;
