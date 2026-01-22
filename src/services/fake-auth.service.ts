// services/fake-auth.service.ts
import { AuthService } from './auth.service';

export class FakeAuthService implements AuthService {
  async login(): Promise<void> {
    // simulate successful login
    return;
  }
}
