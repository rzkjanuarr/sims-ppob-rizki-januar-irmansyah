import type { HistoryResponse } from '../Response/HistoryResponse';

export interface HistoryRepository {
  getHistory(offset?: number, limit?: number): Promise<HistoryResponse>;
}
