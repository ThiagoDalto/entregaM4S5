import { Router } from "express";

import userCreateController from "../../controllers/user/userCreate.controller";
import userListController from "../../controllers/user/userList.controller";
import userSoftDeleteController from "../../controllers/user/userSoftDelete.controller";
import userUpdateController from "../../controllers/user/userUpdate.controller";
import ensureAuthMiddleware from "../../middlewares/ensureAuth.middleware";
import ensureAuthUpdate from "../../middlewares/ensureAuthUpdate.middleware";
import ensureIsAdmMiddleware from "../../middlewares/ensureIsAdm.middleware";

const userRoutes = Router();

userRoutes.post("", userCreateController);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  userListController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureAuthUpdate,
  userUpdateController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  userSoftDeleteController
);

export default userRoutes;
