const { By, until } = require('selenium-webdriver');

class SecurePage {
    constructor(driver) {
        this.driver = driver;
        this.logoutButton = By.xpath('//a[contains(text(), "Log out")]');
        this.successMessage = By.className('post-title');
    }

    async isDisplayed() {
        try {
            await this.driver.wait(until.elementLocated(this.logoutButton), 5000);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getSuccessMessage() {
        const element = await this.driver.findElement(this.successMessage);
        return await element.getText();
    }

    async logout() {
        await this.driver.findElement(this.logoutButton).click();
    }
}

module.exports = SecurePage;