import { httpClient } from '../../../../../../core/network/HttpClient';
import { AppRoutes } from '../../../../../../core/network/AppRoutes';
import type { TransactionRepository } from '../Repository/TransactionRepository';
import type { TransactionPayload } from '../Model/TransactionModel';
import type { TransactionResponse } from '../Response/TransactionResponse';

export class TransactionService implements TransactionRepository {
  async createTransaction(payload: TransactionPayload): Promise<TransactionResponse> {
    try {
      const response = await httpClient.post<TransactionResponse>(
        AppRoutes.TRANSACTION,
        payload
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  }
}
