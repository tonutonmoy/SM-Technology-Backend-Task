import catchAsync from "../../app/config/utlis/catchAsync";
import { PurchaseServices } from "./purchase.services";

const createPurchase = catchAsync(async (req, res) => {
  const result = await PurchaseServices.CreatePurchaseDB(req.body);

  res.send({
    statusCode: 201,
    success: true,
    message: "Purchase created successfully",
    data: result,
  });
});
const getPurchase = catchAsync(async (req, res) => {
  const result = await PurchaseServices.GetPurchaseDB();

  res.send({
    statusCode: 201,
    success: true,
    message: "Purchase crete successfully",
    data: result,
  });
});
const getSinglePurchase = catchAsync(async (req, res) => {
  const result = await PurchaseServices.GetSinglePurchaseDB(req?.params?.email);

  res.send({
    statusCode: 200,
    success: true,
    message: "Purchase get successfully",
    data: result,
  });
});

export const PurchaseControllers = {
  createPurchase,
  getPurchase,
  getSinglePurchase,
};
