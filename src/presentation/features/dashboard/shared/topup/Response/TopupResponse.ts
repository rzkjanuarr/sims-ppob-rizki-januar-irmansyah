import type { TopupData } from '../../shared/topup/TopupModel';

export type TopupResponse = {
  status: number;
  message: string;
  data: TopupData;
};
