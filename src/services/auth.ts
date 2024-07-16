import {
  RegisterData,
  LoginData,
  User,
  OtpData,
  OtpReqData,
} from "../types/AuthData";

export const verifyOtp = async (data: OtpData): Promise<any> => {
  const response = await fetch("http://localhost:3000/api/auth/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OTP verification failed: ${errorData.message}`);
  }

  const reData = await response.json();
  return reData;
};

export const requestNewOtp = async (data: OtpReqData): Promise<any> => {
  const response = await fetch("http://localhost:3000/api/auth/generate-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const reData = await response.json();
  return reData;
};

export const register = async (credentials: RegisterData): Promise<any> => {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Registration failed: ${errorData.message}`);
  }

  const data = await response.json();
  return data;
};

export const login = async (credentials: LoginData): Promise<User> => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data: User = await response.json();

  return data;
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
};
