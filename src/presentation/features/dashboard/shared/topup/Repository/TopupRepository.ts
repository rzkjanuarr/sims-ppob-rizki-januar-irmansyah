import type { TopupPayload } from '../Model/TopupModel';
import type { TopupResponse } from '../Response/TopupResponse';

export interface TopupRepository {
  topup(payload: TopupPayload): Promise<TopupResponse>;
}
