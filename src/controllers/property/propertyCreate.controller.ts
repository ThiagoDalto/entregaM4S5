import { Request, Response } from "express";
import { IPropertyRequest } from "../../interfaces/properties";
import propertyCreateService from "../../services/property/propertyCreate.service";

const propertyCreateController = async (req: Request, res: Response) => {
  const property: IPropertyRequest = req.body;

  const createdProperty = await propertyCreateService(property);

  return res.status(201).json(createdProperty);
};
export default propertyCreateController;
