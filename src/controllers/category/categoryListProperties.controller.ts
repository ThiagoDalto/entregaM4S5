import { Request, Response } from "express";
import categoryListPropertiesService from "../../services/category/categoryListProperties.service";

const categoryListPropertiesController = async (
  req: Request,
  res: Response
) => {
  const Categoryd = req.params.id;

  const categoryIdListProperty = await categoryListPropertiesService(Categoryd);

  return res.status(200).json(categoryIdListProperty);
};
export default categoryListPropertiesController;
