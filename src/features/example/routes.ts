import { Router } from "express";

import { asyncHandler } from "@fcai-sis/shared-utilities";
//import validateExampleMessageMiddleware from "./logic/middlewares/validateExampleMessage.middleware";
import createServiceHandler from "./logic/handlers/createService.handler";
import readServiceHandler from "./logic/handlers/readService.handler";
import readServiceByIdHandler from "./logic/handlers/readServiceById.handler";

export default (router: Router) => {
  router.post(
    "/service/create",

    // IDK how to validate a Data that i dont have
    //validateExampleMessageMiddleware,

    // Handle example request
    asyncHandler(createServiceHandler)
  );

  router.get("/service/read", asyncHandler(readServiceHandler));

  router.get("/service/read/:id", asyncHandler(readServiceByIdHandler));
};
