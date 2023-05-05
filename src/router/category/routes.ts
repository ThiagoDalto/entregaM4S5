import { Router } from "express";
import categoryCreateController from "../../controllers/category/categoryCreate.controller";
import categoryListController from "../../controllers/category/categoryList.controller";
import categoryListPropertiesController from "../../controllers/category/categoryListProperties.controller";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../../middlewares/ensureIsAdm.middleware";

const categoryRoutes = Router();

categoryRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  categoryCreateController
);
categoryRoutes.get("", categoryListController);
categoryRoutes.get("/:id/properties", categoryListPropertiesController);

export default categoryRoutes;
