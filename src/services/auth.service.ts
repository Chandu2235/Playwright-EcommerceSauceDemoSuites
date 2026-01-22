// services/auth.service.ts
export interface AuthService {
  login(username: string, password: string): Promise<void>;
}
