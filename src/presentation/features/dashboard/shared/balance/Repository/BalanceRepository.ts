import type { BalanceResponse } from '../Response/BalanceResponse';

export interface BalanceRepository {
  getBalance(): Promise<BalanceResponse>;
}
