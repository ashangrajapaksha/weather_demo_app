export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string | null;
  general?: string | null;
};

export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  token: string;
  userId: string;
};

export type OtpData = {
  email: string;
  otp: string;
};

export type OtpResponse = {
  message: string;
};
