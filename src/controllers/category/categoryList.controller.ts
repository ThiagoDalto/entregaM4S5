import { Request, Response } from "express";
import categoryListService from "../../services/category/categoryList.service";

const categoryListController = async (req: Request, res: Response) => {
  const categories = await categoryListService();

  return res.json(categories);
};

export default categoryListController;
