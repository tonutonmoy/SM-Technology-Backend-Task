import { TService } from "./service.interface";
import ServiceModel from "./service.model";

const CreateServiceDB = async (payload: TService) => {
  const result = await ServiceModel.create(payload);

  return result;
};

const GetServiceDB = async () => {
  const result = await ServiceModel.find();
  return result;
};

export const ServiceServices = {
  CreateServiceDB,
  GetServiceDB,
};
