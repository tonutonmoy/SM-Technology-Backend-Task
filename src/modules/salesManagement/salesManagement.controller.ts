import catchAsync from "../../app/config/utlis/catchAsync";
import { CreateSalesServices } from "./salesManagement.services";

const createSales = catchAsync(async (req, res) => {
  const result = await CreateSalesServices.CreateSalesDB(req?.body);

  res.send({
    statusCode: 201,
    success: true,
    message: "Sales crete successfully",
    data: result,
  });
});
const getSales = catchAsync(async (req, res) => {
  const result = await CreateSalesServices.GetSalesDB();

  res.send({
    statusCode: 201,
    success: true,
    message: "Sales crete successfully",
    data: result,
  });
});

export const SalesControllers = {
  createSales,
  getSales,
};
