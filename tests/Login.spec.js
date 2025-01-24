const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const { Utility } = require('../utilities/Utility');
const credentials = require('../utilities/credentials');
const testData = require('../testdata/Login.json');
const exp = require('constants');

test.describe('Login Tests', () => {

    test('Login - Valid login functionality', async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const utility = new Utility(page);
        const validData = testData["Valid login"];
        const { username, password } = credentials[validData.role];
        console.log(`User: ${username}, Password: ${password}`);
        await loginPage.goTo();
        await loginPage.Login(username, password);
        await utility.verifyPageTitle(validData.expectedTitle);
    });

    test('Login - Invalid login functionality', async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const forgotPasswordPage = poManager.getForgotPasswordPage();
        const invalidData = testData["Invalid email"];
        const username = invalidData.username;
        console.log(`Invalid User: ${username}`);
        await loginPage.goTo();
        await loginPage.clickForgotPassword();
        await expect(forgotPasswordPage.forgotMessage).toBeVisible();
        await forgotPasswordPage.sendInstructions(username);
        await forgotPasswordPage.verifyErrorMessage(invalidData.errorMessage);
    });

    test('Login - Verify the systems behavior when invalid credentials are entered', async({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const invalidData = testData["Invalid login"];
        await loginPage.goTo();
        await loginPage.Login(invalidData.username, invalidData.password);
        await expect(loginPage.errorMessage).toHaveText('Login failed; Invalid user ID or password.');
    });

});
