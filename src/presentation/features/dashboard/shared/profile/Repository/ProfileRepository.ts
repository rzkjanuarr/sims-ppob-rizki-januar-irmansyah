import type { ProfileUpdatePayload } from '../Model/ProfileModel';
import type { ProfileResponse } from '../Response/ProfileResponse';

export interface ProfileRepository {
  getProfile(): Promise<ProfileResponse>;
  updateProfile(payload: ProfileUpdatePayload): Promise<ProfileResponse>;
  updateProfileImage(file: File): Promise<ProfileResponse>;
}
