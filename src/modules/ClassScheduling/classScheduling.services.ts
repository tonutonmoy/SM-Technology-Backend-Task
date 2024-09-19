import { ClassSchedule } from "./classScheduling.interface";
import ClassScheduleModel from "./classScheduling.model";


const createClassScheduleDB = async (payload: ClassSchedule) => {
  const { date, trainerId, startTime, endTime } = payload;

  // Step 1: Check if the day already has 5 class schedules
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const classCount = await ClassScheduleModel.countDocuments({
    date: { $gte: startOfDay, $lt: endOfDay }
  });

  if (classCount >= 5) {
    throw new Error("Maximum of 5 class schedules already reached for the day.");
  }

  // Step 2: Ensure that each class lasts for exactly 2 hours
  const classDuration = (new Date(`1970-01-01T${endTime}`).getTime() - new Date(`1970-01-01T${startTime}`).getTime()) / (1000 * 60 * 60);
  if (classDuration !== 2) {
    throw new Error("Each class schedule must last for exactly 2 hours.");
  }
  
  const result = await ClassScheduleModel.create(payload);
  return result;
};

const getAllClassScheduleDB = async () => {
 

  const result = await ClassScheduleModel.find();
  return result;
};

const getSingleClassScheduleDB = async (id: string | undefined) => {
  const result = await ClassScheduleModel.findOne({ _id: id });
  return result;
};
const updateClassScheduleDB = async (id: string, payload:any) => {
  const result = await ClassScheduleModel.updateOne({ _id: id }, payload);

  return result;
};

const deleteClassScheduleModelDB = async (_id: string) => {
  const result= await ClassScheduleModel.deleteOne({ _id })

  
  return result;
};

export const ClassScheduleServices = {
  createClassScheduleDB,
  getAllClassScheduleDB,
  getSingleClassScheduleDB,
  updateClassScheduleDB,
  deleteClassScheduleModelDB,
};
