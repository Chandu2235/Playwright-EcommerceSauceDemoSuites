import { test as base, expect } from '@playwright/test';

type TestFixtures = {
    // Add custom fixtures here if needed
};

export const test = base.extend<TestFixtures>({
    // Define fixtures
});

export { expect };