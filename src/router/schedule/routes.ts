import { Router } from "express";
import scheduleCreateController from "../../controllers/schedule/scheduleCreate.controller";
import scheduleListPropertiesController from "../../controllers/schedule/schedulesListProperty.controller";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../../middlewares/ensureIsAdm.middleware";

const scheduleRoutes = Router();

scheduleRoutes.post("", ensureAuthMiddleware, scheduleCreateController);
scheduleRoutes.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  scheduleListPropertiesController
);

export default scheduleRoutes;
