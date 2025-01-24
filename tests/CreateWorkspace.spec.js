const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const credentials = require('../utilities/credentials');
const testData = require('../testdata/CreateWorkspace.json');


test.describe('Create Workspace Tests', () => {

    test.only('Create workspace - Verify the user is able to create a new workspace by selecting a single widget', async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const newWorkspacePage = poManager.getNewWorkspacePage();
        const dashboardPage = poManager.getDashboardPage();
        const validData = testData["Single Widget"];
        const { username, password } = credentials["user"];
        console.log(`User: ${username}, Password: ${password}`);
        await loginPage.goTo();
        await loginPage.Login(username, password);
        const isWorkspaceVisible = await dashboardPage.isWorkspaceVisible(validData.workspaceName);
        console.log("Workspace visible is ------- ", isWorkspaceVisible);
        await page.waitForTimeout(5000);
        if (isWorkspaceVisible) {
            console.log(`Workspace "${validData.workspaceName}" already exists. Skipping creation.`);
            return;
        }
        await newWorkspacePage.CreateWorkspace(validData.workspaceName,validData.mainCategoryWidget,validData.subCategoryWidget);
        console.log(dashboardPage.workspaceLocator(validData.workspaceName));
        await page.waitForTimeout(5000);
        expect(dashboardPage.workspaceLocator(validData.workspaceName)).toBeVisible();
    });

    test('Create workspace - Verify the user is able to create a new workspace without selecting any widget',async({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const newWorkspacePage = poManager.getNewWorkspacePage();
        const dashboardPage = poManager.getDashboardPage();
        const validData = testData["No Widget"];
        const { username, password } = credentials["user"];
        console.log(`User: ${username}, Password: ${password}`);
        await loginPage.goTo();
        await loginPage.Login(username, password);
        const isWorkspaceVisible = await dashboardPage.isWorkspaceVisible(validData.workspaceName);
        console.log("Workspace visible is ------- ", isWorkspaceVisible);
        await page.waitForTimeout(5000);
        if (isWorkspaceVisible) {
            console.log(`Workspace "${validData.workspaceName}" already exists. Skipping creation.`);
            return;
        }
        await newWorkspacePage.CreateWorkspace(validData.workspaceName,validData.mainCategoryWidget,validData.subCategoryWidget);
        console.log(dashboardPage.workspaceLocator(validData.workspaceName));
        await page.waitForTimeout(5000);
        expect(dashboardPage.workspaceLocator(validData.workspaceName)).toBeVisible();
    });
});
