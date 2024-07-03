import { RegisterData, LoginData, User } from "../types/AuthData";

export const register = async (credentials: RegisterData): Promise<void> => {
  const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }
};

export const login = async (credentials: LoginData): Promise<User> => {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
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
