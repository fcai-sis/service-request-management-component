import { Router } from "express";

import { upload } from "../../app";
import { asyncHandler } from "@fcai-sis/shared-utilities";
import { Role, checkRole } from "@fcai-sis/shared-middlewares";
import createServiceHandler from "./logic/handlers/createServiceRequest.handler";
import readServiceByIdHandler from "./logic/handlers/fetchServiceRequestById.handler";
import readServiceHandler from "./logic/handlers/fetchPaginatedServiceRequests.handler";
import acceptServiceRequestHandler from "./logic/handlers/acceptServiceRequest.handler";
import rejectServiceRequestHandler from "./logic/handlers/rejectServiceRequest.handler";
import deleteServiceRequestHandler from "./logic/handlers/deleteServiceRequest.handler";
import completeServiceRequestHandler from "./logic/handlers/completeServiceRequest.handler";
import fetchMyServiceRequestsHandler from "./logic/handlers/fetchMyServiceRequests.handler";
import filterationQueryParamsMiddleware from "./logic/middlewares/filterationQueryParams.middleware";
import validateAcceptServiceRequestMiddleware from "./logic/middlewares/acceptServiceRequest.middleware";
import validateRejectServiceRequestMiddleware from "./logic/middlewares/rejectServiceRequest.middleware";
import ensureServiceRequestIdInParamsMiddleware from "./logic/middlewares/ensureRequestIdInParams.middleware";
import validateCreateServiceRequestMiddleware from "./logic/middlewares/validateCreateServiceRequest.middleware";

const serviceRequestRoutes = (router: Router) => {
  router.post(
    "/",
    upload.single("image"),
    checkRole([Role.STUDENT]),
    validateCreateServiceRequestMiddleware,
    asyncHandler(createServiceHandler)
  );

  router.get(
    "/",
    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    filterationQueryParamsMiddleware,
    readServiceHandler
  );

  router.get("/mine", checkRole([Role.STUDENT]), fetchMyServiceRequestsHandler);

  router.get(
    "/:serviceRequestId",
    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    ensureServiceRequestIdInParamsMiddleware,
    asyncHandler(readServiceByIdHandler)
  );

  router.patch(
    "/accept/:serviceRequestId",
    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    ensureServiceRequestIdInParamsMiddleware,
    validateAcceptServiceRequestMiddleware,
    asyncHandler(acceptServiceRequestHandler)
  );

  router.patch(
    "/reject/:serviceRequestId",
    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    ensureServiceRequestIdInParamsMiddleware,
    validateRejectServiceRequestMiddleware,
    asyncHandler(rejectServiceRequestHandler)
  );

  router.patch(
    "/complete/:serviceRequestId",
    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    ensureServiceRequestIdInParamsMiddleware,
    asyncHandler(completeServiceRequestHandler)
  );

  router.delete(
    "/delete/:serviceRequestId",
    checkRole([Role.EMPLOYEE, Role.ADMIN]),
    ensureServiceRequestIdInParamsMiddleware,
    asyncHandler(deleteServiceRequestHandler)
  );
};

export default serviceRequestRoutes;
