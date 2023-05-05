import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import scheduleListPropertiesService from "../../services/schedule/scheduleList.ByPropertiesId.service";

const scheduleListPropertiesController = async (
  req: Request,
  res: Response
) => {
  const propertyId = req.params.id;

  const propertyListSchedule = await scheduleListPropertiesService(propertyId);

  return res.status(200).json(instanceToPlain(propertyListSchedule));
};

export default scheduleListPropertiesController;
