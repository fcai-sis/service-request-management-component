import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";
import logger from "../../../../core/logger";

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

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating reject service request req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for reject service request req body: ${JSON.stringify(
          req.body
        )}`
      );

      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    // Attach the validated data to the request body
    req.body.message = req.body.message.trim();

    next();
  },
];

export default validateRejectServiceRequestMiddleware;
