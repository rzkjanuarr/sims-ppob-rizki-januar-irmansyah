import { AppRoutes } from '../../../../../../core/network/AppRoutes';
import { httpClient } from '../../../../../../core/network/HttpClient';
import type { HistoryRepository } from '../Repository/HistoryRepository';
import type { HistoryResponse } from '../Response/HistoryResponse';

export class HistoryService implements HistoryRepository {
  async getHistory(offset?: number, limit?: number): Promise<HistoryResponse> {
    try {
      const params: any = {};
      if (offset !== undefined) params.offset = offset;
      if (limit !== undefined) params.limit = limit;

      const response = await httpClient.get<HistoryResponse>(
        AppRoutes.TRANSACTION_HISTORY,
        { params }
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
