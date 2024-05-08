import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import createServiceHandler from "./logic/handlers/createServiceRequest.handler";
import readServiceHandler from "./logic/handlers/readServiceRequests.handler";
import readServiceByIdHandler from "./logic/handlers/getServiceRequestById.handler";
import validateCreateServiceRequestMiddleware from "./logic/middlewares/validateCreateServiceRequest.middleware";
import { paginationQueryParamsMiddleware } from "@fcai-sis/shared-middlewares";
import ensureServiceRequestIdInParamsMiddleware from "./logic/middlewares/ensureRequestIdInParams.middleware";
import { upload } from "../../app";
import acceptServiceRequestHandler from "./logic/handlers/acceptServiceRequest.handler";
import validateAcceptServiceRequestMiddleware from "./logic/middlewares/acceptServiceRequest.middleware";
import validateRejectServiceRequestMiddleware from "./logic/middlewares/rejectServiceRequest.middleware";
import rejectServiceRequestHandler from "./logic/handlers/rejectServiceRequest.handler";
import validateUpdateServiceRequestMiddleware from "./logic/middlewares/validateUpdateServiceRequest.middleware";
import updateServiceRequestHandler from "./logic/handlers/updateServiceRequest.handler";
import deleteServiceRequestHandler from "./logic/handlers/deleteServiceRequest.handler";

const serviceRequestRoutes = (router: Router) => {
  router.post(
    "/create",

    upload.single("imgAttachment"),
    validateCreateServiceRequestMiddleware,
    asyncHandler(createServiceHandler)
  );

  router.get(
    "/read",

    paginationQueryParamsMiddleware,
    asyncHandler(readServiceHandler)
  );

  router.get(
    "/read/:serviceRequestId",

    ensureServiceRequestIdInParamsMiddleware,
    asyncHandler(readServiceByIdHandler)
  );

  router.patch(
    "/accept/:serviceRequestId",
    ensureServiceRequestIdInParamsMiddleware,
    validateAcceptServiceRequestMiddleware,
    asyncHandler(acceptServiceRequestHandler)
  );

  router.patch(
    "/reject/:serviceRequestId",
    ensureServiceRequestIdInParamsMiddleware,
    validateRejectServiceRequestMiddleware,
    asyncHandler(rejectServiceRequestHandler)
  );

  router.patch(
    "/update/:serviceRequestId",
    ensureServiceRequestIdInParamsMiddleware,
    validateUpdateServiceRequestMiddleware,
    asyncHandler(updateServiceRequestHandler)
  );
  router.delete(
    "/delete/:serviceRequestId",
    ensureServiceRequestIdInParamsMiddleware,
    asyncHandler(deleteServiceRequestHandler)
  );
};

export default serviceRequestRoutes;
