import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

const middlewares = [
  validator
    .param("serviceRequestId")

    .exists()
    .withMessage("Service Request ID is required")

    .isMongoId()
    .withMessage("Service Request ID must be a valid Mongo ID"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    req.params.serviceRequestId = req.params.serviceRequestId.trim();

    next();
  },
];

const ensureServiceRequestIdInParamsMiddleware = middlewares;
export default ensureServiceRequestIdInParamsMiddleware;
