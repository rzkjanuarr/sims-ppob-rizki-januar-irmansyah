import type { BannerResponse } from '../Response/BannerResponse';

export interface BannerRepository {
  getBanners(): Promise<BannerResponse>;
}
