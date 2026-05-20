import type { BalanceData } from '../Model/BalanceModel';

export type BalanceResponse = {
  status: number;
  message: string;
  data: BalanceData;
};
