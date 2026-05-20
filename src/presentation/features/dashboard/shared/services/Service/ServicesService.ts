import { AppRoutes } from '../../../../../../core/network/AppRoutes';
import { httpClient } from '../../../../../../core/network/HttpClient';
import type { ServicesRepository } from '../Repository/ServicesRepository';
import type { ServicesResponse } from '../Response/ServicesResponse';

export class ServicesService implements ServicesRepository {
  async getServices(): Promise<ServicesResponse> {
    try {
      const response = await httpClient.get<ServicesResponse>(
        AppRoutes.SERVICES
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
