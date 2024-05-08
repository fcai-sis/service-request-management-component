import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";
import logger from "../../../../core/logger";

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

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating accept service request req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for accept service request req body: ${JSON.stringify(
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
    req.body.claimAt = new Date(req.body.claimAt);
    req.body.message = req.body.message?.trim();

    next();
  },
];

export default validateAcceptServiceRequestMiddleware;
