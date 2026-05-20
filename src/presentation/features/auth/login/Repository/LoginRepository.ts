import type { LoginPayload } from '../Model/LoginModel';
import type { LoginResponse } from '../Response/LoginResponse';

export interface LoginRepository {
  login(payload: LoginPayload): Promise<LoginResponse>;
}
