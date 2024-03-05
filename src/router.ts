import { Router } from "express";

import ServiceRoute from "./features/example/routes";

const router: Router = Router();

export default (): Router => {
  ServiceRoute(router);

  return router;
};
