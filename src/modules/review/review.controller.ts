import catchAsync from "../../app/config/utlis/catchAsync";
import { ReviewServices } from "./review.service";


const createReview = catchAsync(async (req, res) => {

 

  const result = await ReviewServices.CreateReviewDB(req?.body);

  res.send({
    statusCode: 201,
    success: true,
    message: "Review crete successfully",
    data: result,
  });
});
const getReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.GetProductReviewDB(req?.params?.id);

  res.send({
    statusCode: 200,
    success: true,
    message: "Review get successfully",
    data: result,
  });
});

export const ReviewControllers = {
    getReview,
    createReview,
};
