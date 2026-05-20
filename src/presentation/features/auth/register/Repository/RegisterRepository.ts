import type { RegisterPayload } from '../Model/RegisterModel';
import type { RegisterResponse } from '../Response/RegisterResponse';

export interface RegisterRepository {
  register(payload: RegisterPayload): Promise<RegisterResponse>;
}
