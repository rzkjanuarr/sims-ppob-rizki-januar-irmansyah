import type { LoginData } from '../Model/LoginModel';

export type LoginResponse = {
  status: number;
  message: string;
  data: LoginData;
};
