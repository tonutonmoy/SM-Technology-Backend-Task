import catchAsync from "../../app/config/utlis/catchAsync";
import { ServiceServices } from "./service.services";

const createService = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await ServiceServices.CreateServiceDB(req?.body);

  res.send({
    statusCode: 201,
    success: true,
    message: "Service crete successfully",
    data: result,
  });
});
const getService = catchAsync(async (req, res) => {
  const result = await ServiceServices.GetServiceDB();

  res.send({
    statusCode: 201,
    success: true,
    message: "Service crete successfully",
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getService,
};
