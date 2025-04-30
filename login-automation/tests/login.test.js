const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');
const SecurePage = require('../pages/SecurePage');
const { username, password } = require('../utilities/config');

describe('Login Tests', () => {
    let driver;
    let loginPage;
    let securePage;

    // Increased timeout for beforeAll hook
    beforeAll(async () => {
        try {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.manage().window().maximize();
            await driver.manage().setTimeouts({ implicit: 10000 });
            loginPage = new LoginPage(driver);
            securePage = new SecurePage(driver);
        } catch (error) {
            console.error('Failed to initialize WebDriver:', error);
            throw error;
        }
    }, 30000); // 30 seconds timeout for setup

    // Safely quit driver if it was initialized
    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('Successful login with valid credentials', async () => {
        await loginPage.open();
        await loginPage.login(username, password);
        
        const isSecurePageDisplayed = await securePage.isDisplayed();
        expect(isSecurePageDisplayed).toBe(true);
        
        const successMessage = await securePage.getSuccessMessage();
        expect(successMessage).toContain('Logged In Successfully');
        
        await securePage.logout();
    }, 20000); // 20 seconds timeout for this test

    test('Failed login with invalid username', async () => {
        await loginPage.open();
        await loginPage.login('invalidUser', password);
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Your username is invalid!');
    }, 20000);

    test('Failed login with invalid password', async () => {
        await loginPage.open();
        await loginPage.login(username, 'invalidPassword');
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Your password is invalid!');
    }, 20000);

    test('Failed login with empty credentials', async () => {
        await loginPage.open();
        await loginPage.login('', '');
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Your username is invalid!');
    }, 20000);
});