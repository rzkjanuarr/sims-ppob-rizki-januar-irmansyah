import type { ServicesResponse } from '../Response/ServicesResponse';

export interface ServicesRepository {
  getServices(): Promise<ServicesResponse>;
}
