export const formatCurrency = (amount: number): string => {
  return `Q${amount.toFixed(2)}`;
};

export const formatPhone = (phone: string): string => {
  // Remove non-digits
  const digits = phone.replace(/\D/g, "");
  
  // Format: 502-1234-5678
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  
  return phone;
};

export const validatePhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 && digits.startsWith("502");
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

