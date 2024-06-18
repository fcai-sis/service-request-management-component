import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";
import { serviceRequestStatuses } from "../../data/models/serviceRequest.model";
import logger from "../../../../core/logger";

/**
 * Validates the request body of the Update Service Request endpoint.
 */
const validateUpdateServiceRequestMiddleware = [
  validator
    .body("serviceName")
    .optional()
    .isString()
    .withMessage("Service name must be a string"),

  validator
    .body("message")
    .optional()
    .isString()
    .withMessage("Message must be a string"),

  validator
    .body("status")
    .optional()
    .isIn(serviceRequestStatuses)
    .withMessage("Invalid service status"),

  validator
    .body("claimAt")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating update service request req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for update service request req body: ${JSON.stringify(
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
    if (req.body.serviceName)
      req.body.serviceName = req.body.serviceName?.trim();
    if (req.body.message) req.body.message = req.body.message?.trim();
    if (req.body.status) req.body.status = req.body.status?.trim();
    if (req.body.claimAt) req.body.claimAt = new Date(req.body.claimAt);

    next();
  },
];

export default validateUpdateServiceRequestMiddleware;
