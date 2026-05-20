import { httpClient } from '../../../../../core/network/HttpClient';
import { AppRoutes } from '../../../../../core/network/AppRoutes';
import type { RegisterRepository } from '../Repository/RegisterRepository';
import type { RegisterPayload } from '../Model/RegisterModel';
import type { RegisterResponse } from '../Response/RegisterResponse';

export class RegisterService implements RegisterRepository {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    try {
      const response = await httpClient.post<RegisterResponse>(
        AppRoutes.REGISTRATION,
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
