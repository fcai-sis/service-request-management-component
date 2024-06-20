import * as validator from "express-validator";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

/**
 * Validates the request body of the Reject Service Request endpoint.
 */
const validateRejectServiceRequestMiddleware = [
  validator
    .body("message")

    .exists()
    .withMessage("Message is required")

    .isString()
    .withMessage("Message must be a string"),

  validateRequestMiddleware,
];

export default validateRejectServiceRequestMiddleware;
