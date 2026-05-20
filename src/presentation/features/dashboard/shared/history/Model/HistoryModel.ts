export type HistoryRecord = {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
};

export type HistoryData = {
  offset: number;
  limit: number;
  records: HistoryRecord[];
};
