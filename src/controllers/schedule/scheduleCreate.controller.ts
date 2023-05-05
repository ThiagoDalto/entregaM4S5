import { Request, Response } from "express";
import scheduleCreateService from "../../services/schedule/scheduleCreate.service";
import { IScheduleRequest } from "../../interfaces/schedules";

const scheduleCreateController = async (req: Request, res: Response) => {
  const schedule: IScheduleRequest = req.body;
  const userId: string = req.user.id;

  const createdSchedule = await scheduleCreateService({ ...schedule, userId });

  return res.status(201).json({
    message: "Schedule created",
  });
};

export default scheduleCreateController;
