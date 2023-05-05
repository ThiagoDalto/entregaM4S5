import AppDataSource from "../../data-source";
import { Schedule } from "../../entities/schedules_user_properties.entity";
import { IScheduleRequest } from "../../interfaces/schedules";
import { AppError } from "../../errors/appError";
import { Property } from "../../entities/properties.entity";
import { User } from "../../entities/user.entity";

const scheduleCreateService = async ({
  date,
  hour,
  propertyId,
  userId,
}: IScheduleRequest): Promise<void> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const propertyRepository = AppDataSource.getRepository(Property);
  const userRepository = AppDataSource.getRepository(User);

  const findPropertySchedule = await propertyRepository
    .createQueryBuilder("properties")
    .leftJoinAndSelect("properties.schedule", "schedule")
    .where("properties.id = :id", { id: propertyId })
    .andWhere("schedule.date = :date", { date: date })
    .andWhere("schedule.hour = :hour", { hour: hour })
    .getOne();

  if (findPropertySchedule) {
    throw new AppError("Property schedule already exists", 400);
  }

  let dateHour = `${date}, ${hour}`;
  let parsingDate = Date.parse(dateHour);
  const infoDate = new Date(parsingDate);

  if (infoDate.getDay() === 0 || infoDate.getDay() === 6) {
    throw new AppError("Invalid date", 400);
  }

  if (infoDate.getHours() < 8 || infoDate.getHours() >= 18) {
    throw new AppError("Invalid hour", 400);
  }

  const properties = await propertyRepository.findOneBy({ id: propertyId });

  if (!properties) {
    throw new AppError("Property not found", 404);
  }

  const userFind = await userRepository.findOneBy({ id: userId });

  const schedule = scheduleRepository.create({
    date: date,
    hour: hour,
    property: properties,
    user: userFind!,
  });
  await scheduleRepository.save(schedule);
};

export default scheduleCreateService;
