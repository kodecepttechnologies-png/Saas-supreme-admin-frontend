export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  customId: string;
  name: string;
  email: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponseData {
  supremeAdmin: AuthUser;
  token: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}