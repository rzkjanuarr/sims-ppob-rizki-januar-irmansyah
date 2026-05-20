import type { ProfileData } from '../Model/ProfileModel';

export type ProfileResponse = {
  status: number;
  message: string;
  data: ProfileData;
};
