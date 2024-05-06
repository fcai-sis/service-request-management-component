import { Router } from "express";

import serviceRequestRoutes from "./features/service/serviceRequest.routes";

export const serviceRequestRouter = (): Router => {
  const router = Router();
  serviceRequestRoutes(router);
  return router;
};
