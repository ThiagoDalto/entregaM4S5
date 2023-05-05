import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./router/user/routes";
import sessionRoutes from "./router/session/routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import categoryRoutes from "./router/category/routes";
import propertyRoutes from "./router/property/routes";
import scheduleRoutes from "./router/schedule/routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/categories", categoryRoutes);
app.use("/properties", propertyRoutes);
app.use("/schedules", scheduleRoutes);
app.use(handleErrorMiddleware);

export default app;