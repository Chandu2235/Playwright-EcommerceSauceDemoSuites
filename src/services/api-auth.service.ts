// services/api-auth.service.ts
import { AuthService } from './auth.service';
import { APIRequestContext } from '@playwright/test';

export class APIAuthService implements AuthService {
  constructor(private request: APIRequestContext) {}

  async login(username: string, password: string) {
    await this.request.post('/api/login', {
      data: { username, password }
    });
  }
}
