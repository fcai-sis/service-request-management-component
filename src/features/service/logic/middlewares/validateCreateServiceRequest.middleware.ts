import * as validator from "express-validator";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

/**
 * Validates the request body of the Create Service Request endpoint.
 */
const validateCreateServiceRequestMiddleware = [
  validator
    .body("serviceName")

    .exists()
    .withMessage("Service name is required")

    .isString()
    .withMessage("Service name must be a string"),

  validateRequestMiddleware,
];

export default validateCreateServiceRequestMiddleware;
