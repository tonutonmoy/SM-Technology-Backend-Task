import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";


const reviewSchema = new Schema<TReview>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  review: { type: String, required: true },
  image: { type: String, required: true },

  rating: { type: Number, required: true },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
});

const ReviewModel = model<TReview>("Reviews", reviewSchema);

export default ReviewModel;
