import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";
import { ServiceStatusType } from "../../data/models/serviceRequest.model";
import logger from "../../../../core/logger";
import { StudentModel } from "@fcai-sis/shared-models";

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

  validator
    .body("status")
    .exists()
    .withMessage("Service status is required")
    .isIn(["pending", "completed", "cancelled"] as ServiceStatusType[])
    .withMessage("Invalid service status"),

  validator
    .body("studentId")
    .exists()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Invalid student ID")
    .custom(async (value) => {
      // Check if the student exists
      const student = await StudentModel.findById(value);
      if (!student) {
        throw new Error("Student not found");
      }

      return true;
    }),

  validator
    .body("message")
    .optional()
    .isString()
    .withMessage("Message must be a string"),

  validator
    .body("imgAttachment")
    .exists()
    .withMessage("Image attachment is required")
    .isString()
    .withMessage("Image attachment must be a string"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating create course req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for create service request req body: ${JSON.stringify(
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
    req.body.serviceName = req.body.serviceName.trim();
    req.body.status = req.body.status.trim();
    req.body.studentId = req.body.studentId.trim();
    req.body.message = req.body.message?.trim();

    next();
  },
];

export default validateCreateServiceRequestMiddleware;
