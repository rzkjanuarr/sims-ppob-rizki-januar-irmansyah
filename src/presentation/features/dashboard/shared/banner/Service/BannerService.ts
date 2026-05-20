import { AppRoutes } from '../../../../../../core/network/AppRoutes';
import { httpClient } from '../../../../../../core/network/HttpClient';
import type { BannerRepository } from '../Repository/BannerRepository';
import type { BannerResponse } from '../Response/BannerResponse';

export class BannerService implements BannerRepository {
  async getBanners(): Promise<BannerResponse> {
    try {
      const response = await httpClient.get<BannerResponse>(
        AppRoutes.BANNER
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
