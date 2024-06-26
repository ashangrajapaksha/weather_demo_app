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
  confirmPassword?: string;
};

export type LoginData = {
  email: string;
  password: string;
};
