const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://practicetestautomation.com/practice-test-login/';
        this.usernameField = By.id('username');
        this.passwordField = By.id('password');
        this.submitButton = By.id('submit');
        this.errorMessage = By.id('error');
    }

    async open() {
        await this.driver.get(this.url);
        await this.driver.wait(until.titleIs('Test Login | Practice Test Automation'), 5000);
    }

    async enterUsername(username) {
        const element = await this.driver.findElement(this.usernameField);
        await element.clear();
        await element.sendKeys(username);
    }

    async enterPassword(password) {
        const element = await this.driver.findElement(this.passwordField);
        await element.clear();
        await element.sendKeys(password);
    }

    async submit() {
        await this.driver.findElement(this.submitButton).click();
    }

    async getErrorMessage() {
        const element = await this.driver.findElement(this.errorMessage);
        return await element.getText();
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.submit();
    }
}

module.exports = LoginPage;