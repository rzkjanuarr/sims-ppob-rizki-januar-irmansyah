import type { TransactionPayload } from '../Model/TransactionModel';
import type { TransactionResponse } from '../Response/TransactionResponse';

export interface TransactionRepository {
  createTransaction(payload: TransactionPayload): Promise<TransactionResponse>;
}
