// fixtures/test.fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { UIAuthService } from '../services/ui-auth.service';

type Fixtures = {
  authService: UIAuthService;
};

export const test = base.extend<Fixtures>({
  authService: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(new UIAuthService(loginPage));
  },
});
export const expect = test.expect;