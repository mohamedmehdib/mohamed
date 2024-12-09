// paymentRequestBody.ts
export interface PaymentRequestBody {
  name: string;
  email: string;
  amount: number;
  service: string;
}

// This function will save payment data to localStorage
export const savePaymentData = (data: PaymentRequestBody) => {
  if (typeof window !== "undefined") {
    localStorage.setItem('paymentData', JSON.stringify(data));
  }
};

// This function will retrieve the payment data from localStorage
export const getPaymentData = (): PaymentRequestBody | null => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem('paymentData');
    return data ? JSON.parse(data) : null;
  }
  return null;
};
