import { httpClient } from '../../../../../../core/network/HttpClient';
import { AppRoutes } from '../../../../../../core/network/AppRoutes';
import type { TopupRepository } from '../Repository/TopupRepository';
import type { TopupPayload } from '../Model/TopupModel';
import type { TopupResponse } from '../Response/TopupResponse';

export class TopupService implements TopupRepository {
  async topup(payload: TopupPayload): Promise<TopupResponse> {
    try {
      const response = await httpClient.post<TopupResponse>(
        AppRoutes.TOPUP,
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
