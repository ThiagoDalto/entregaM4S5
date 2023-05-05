import { Router } from "express";
import propertyCreateController from "../../controllers/property/propertyCreate.controller";
import propertyListController from "../../controllers/property/propertyList.controller";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../../middlewares/ensureIsAdm.middleware";

const propertyRoutes = Router();
propertyRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  propertyCreateController
);
propertyRoutes.get("", propertyListController);

export default propertyRoutes;
