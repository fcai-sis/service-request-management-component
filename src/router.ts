import { Router } from "express";

import serviceRequestRoutes from "./features/service/serviceRequest.routes";

const router = Router();

export const serviceRequestRouter = (): Router => {
  serviceRequestRoutes(router);
  return router;
};
