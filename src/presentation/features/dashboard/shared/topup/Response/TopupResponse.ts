import type { TopupData } from '../Model/TopupModel';

export type TopupResponse = {
  status: number;
  message: string;
  data: TopupData;
};
