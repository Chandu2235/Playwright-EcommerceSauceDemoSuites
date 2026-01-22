// services/ui-auth.service.ts
import { AuthService } from './auth.service';
import { LoginPage } from '../pages/login.page';

export class UIAuthService implements AuthService {
  constructor(private loginPage: LoginPage) {}

  async login(username: string, password: string) {
    await this.loginPage.open();
    await this.loginPage.login(username, password);
  }
}
