import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>({
  dataAndTime: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

const ServiceModel = model<TService>("Service", serviceSchema);

export default ServiceModel;
