import type { TransactionData } from '../Model/TransactionModel';

export type TransactionResponse = {
  status: number;
  message: string;
  data: TransactionData;
};
