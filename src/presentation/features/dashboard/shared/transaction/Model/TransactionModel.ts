export type TransactionPayload = {
  service_code: string;
};

export type TransactionData = {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
};
