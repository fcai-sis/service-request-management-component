import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
import createServiceHandler from "./logic/handlers/createServiceRequest.handler";
import readServiceHandler from "./logic/handlers/readServiceRequests.handler";
import readServiceByIdHandler from "./logic/handlers/getServiceRequestById.handler";
import validateCreateServiceRequestMiddleware from "./logic/middlewares/validateCreateServiceRequest.middleware";
import { paginationQueryParamsMiddleware } from "@fcai-sis/shared-middlewares";
import ensureServiceRequestIdInParamsMiddleware from "./logic/middlewares/ensureRequestIdInParams.middleware";

const serviceRequestRoutes = (router: Router) => {
  router.post(
    "/create",

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
};

export default serviceRequestRoutes;
