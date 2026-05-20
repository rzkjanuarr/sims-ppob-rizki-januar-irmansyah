import type { TopupPayload } from '../../shared/topup/TopupModel';
import type { TopupResponse } from '../Response/TopupResponse';

export interface TopupRepository {
  topup(payload: TopupPayload): Promise<TopupResponse>;
}
