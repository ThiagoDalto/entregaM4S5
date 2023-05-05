import { Request, Response } from "express";

import propertyListService from "../../services/property/propertyList.service";

const propertyListController = async (req: Request, res: Response) => {
  const properties = await propertyListService();

  return res.json(properties);
};

export default propertyListController;
