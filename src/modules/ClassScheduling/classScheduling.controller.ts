import catchAsync from "../../app/config/utlis/catchAsync";
import { ClassScheduleServices } from "./classScheduling.services";



const createClassSchedule = catchAsync(async (req, res) => {
  const result = await ClassScheduleServices.createClassScheduleDB(req?.body);

  res.send({
    statusCode: 201,
    success: true,
    message: "ClassSchedule  created successfully",
    data: result,
  });
});

const getClassSchedule = catchAsync(async (req, res) => {
 
  const result = await ClassScheduleServices.getAllClassScheduleDB();

  res.send({
    statusCode: 202,
    success: true,
    message: "ClassSchedule  get successfully",
    data: result,
  });
});
const getSingleClassSchedule = catchAsync(async (req, res) => {

  const result = await ClassScheduleServices.getSingleClassScheduleDB(req?.params?.id);

  res.send({
    statusCode: 202,
    success: true,
    message: "ClassSchedule  get successfully",
    data: result,
  });
});

const updateClassSchedule = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const payload = req?.body;

  delete payload?.id;

  const result = await ClassScheduleServices.updateClassScheduleDB(id, payload);

  res.send({
    statusCode: 203,
    success: true,
    message: "ClassSchedule   update successfully",
    data: result,
  });
});

const deleteClassSchedule = catchAsync(async (req, res) => {
  const payload = req?.body;
  const result = await ClassScheduleServices.deleteClassScheduleModelDB(payload);

  res.send({
    statusCode: 205,
    success: true,
    message: "ClassSchedule  delete successfully",
    data: result,
  });
});

export const ClassScheduleControllers = {
  createClassSchedule,
  getClassSchedule,
  getSingleClassSchedule,
  updateClassSchedule,
  deleteClassSchedule,
};
