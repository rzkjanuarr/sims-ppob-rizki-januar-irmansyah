import { httpClient } from '../../../../../core/network/HttpClient';
import { AppRoutes } from '../../../../../core/network/AppRoutes';
import type { LoginRepository } from '../Repository/LoginRepository';
import type { LoginPayload } from '../Model/LoginModel';
import type { LoginResponse } from '../Response/LoginResponse';

export class LoginService implements LoginRepository {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await httpClient.post<LoginResponse>(
        AppRoutes.LOGIN,
        payload
      );
      return response.data;
    } catch (error: any) {
      // Handle error response from API
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  }
}
