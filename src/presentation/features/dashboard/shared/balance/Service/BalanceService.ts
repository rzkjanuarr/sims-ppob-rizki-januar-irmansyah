import { AppRoutes } from '../../../../../../core/network/AppRoutes';
import { httpClient } from '../../../../../../core/network/HttpClient';
import type { BalanceRepository } from '../Repository/BalanceRepository';
import type { BalanceResponse } from '../Response/BalanceResponse';

export class BalanceService implements BalanceRepository {
  async getBalance(): Promise<BalanceResponse> {
    try {
      const response = await httpClient.get<BalanceResponse>(
        AppRoutes.BALANCE
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
