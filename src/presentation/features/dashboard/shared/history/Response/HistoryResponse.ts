import type { HistoryData } from '../Model/HistoryModel';

export type HistoryResponse = {
  status: number;
  message: string;
  data: HistoryData;
};
