import type { BannerData } from '../Model/BannerModel';

export type BannerResponse = {
  status: number;
  message: string;
  data: BannerData[];
};
