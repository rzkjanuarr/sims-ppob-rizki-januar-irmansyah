import type { ServiceData } from '../Model/ServicesModel';

export type ServicesResponse = {
  status: number;
  message: string;
  data: ServiceData[];
};
