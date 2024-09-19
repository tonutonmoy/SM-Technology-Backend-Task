
import { TReview } from "./review.interface";
import ReviewModel from "./review.model";





const CreateReviewDB = async (data:TReview) => {

  const result = await ReviewModel.create(data);
  return result;
};
const GetProductReviewDB = async (id:string) => {
  


  const result = await ReviewModel.find({productId:id});
  return result;
};

export const ReviewServices = {

    CreateReviewDB,
    GetProductReviewDB
};
