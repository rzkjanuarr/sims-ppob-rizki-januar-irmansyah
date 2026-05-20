import { httpClient } from '../../../../../../core/network/HttpClient';
import { AppRoutes } from '../../../../../../core/network/AppRoutes';
import type { ProfileRepository } from '../Repository/ProfileRepository';
import type { ProfileUpdatePayload } from '../Model/ProfileModel';
import type { ProfileResponse } from '../Response/ProfileResponse';

export class ProfileService implements ProfileRepository {
  async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await httpClient.get<ProfileResponse>(
        AppRoutes.PROFILE
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  }

  async updateProfile(payload: ProfileUpdatePayload): Promise<ProfileResponse> {
    try {
      const response = await httpClient.put<ProfileResponse>(
        AppRoutes.PROFILE_UPDATE,
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

  async updateProfileImage(file: File): Promise<ProfileResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await httpClient.put<ProfileResponse>(
        AppRoutes.PROFILE_IMAGE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
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
