const {expect} = require('@playwright/test');
class Utility {
    constructor(page) {
        if(!page){
            throw new Error("A valid Playwright page instance is required to initialize Utility.")
        }
        this.page = page;
    }

    async verifyTextContent(locator, expectedText, timeout = 5000) {
        if (!locator || !expectedText){
            throw new Error("Both locator and expected text parameters are required insite Verify text content")
        }
        await expect(locator).toHaveText(expectedText, { timeout });
    }
    async verifyDashboardTitle(pageTitle) {
        await this.verifyTextContent(pageTitle, "Dashboard");
    }
    async verifyPageTitle(expectedTitle) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }
}

module.exports = { Utility };
