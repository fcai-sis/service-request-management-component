import * as validator from "express-validator";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

/**
 * Validates the request body of the Accept Service Request endpoint.
 */
const validateAcceptServiceRequestMiddleware = [
  validator
    .body("message")

    .optional()

    .isString()
    .withMessage("Message must be a string"),

  validator
    .body("claimAt")

    .exists()
    .withMessage("Claim date is required")

    .isISO8601()
    .withMessage("Invalid date format"),

  validateRequestMiddleware,
];

export default validateAcceptServiceRequestMiddleware;
