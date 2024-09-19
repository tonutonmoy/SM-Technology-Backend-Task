import { Types } from "mongoose";

export interface TReview {
  name: string;
  email: string;
  rating: number;
  review: string;
  image: string;
  productId: Types.ObjectId;
}
