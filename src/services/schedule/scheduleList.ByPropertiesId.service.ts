import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { Schedule } from "../../entities/schedules_user_properties.entity";

import { AppError } from "../../errors/appError";

const scheduleListPropertiesService = async (propertyId: string): Promise<Object> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const propertyRepository = AppDataSource.getRepository(Property);

  const propertyExist = await propertyRepository.findOne({
    where: {
      id: propertyId,
    },
  });

  if (!propertyExist) {
    throw new AppError("Schedule doesn't exist", 404);
  }

  const schedulesList = await scheduleRepository.find({
    where: {
      property: propertyExist,
    },
    relations: {
      user: true,
    },
  });

  const propertiesAllDataList = await propertyRepository.findOne({
    where: {
      id: propertyId,
    },
    relations: {
      schedule: true,
      address: true,
      category: true,
    },
  });

  const completePropertyInfo = {
    ...propertiesAllDataList,
    schedules: [...schedulesList],
  };
  delete completePropertyInfo.schedule;

  return completePropertyInfo;
};

export default scheduleListPropertiesService;
