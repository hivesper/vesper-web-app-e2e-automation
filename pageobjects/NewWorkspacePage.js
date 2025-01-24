const { Utility } = require('../utilities/Utility');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { test, expect } = require('@playwright/test');
class NewWorkspacePage {

    constructor(page)
    {
        if (!page) {
            throw new Error('A valid Playwright page instance is required to initialize POManager.');
        }
        this.page = page;
        this.widgetSearchBox = page.getByPlaceholder("Search widget by name...");
        this.utility = new Utility(page);
        this.dashboardPage = new DashboardPage(page);
        this.workspaceName = page.getByPlaceholder("Workspace name...");
        this.saveWorkspace = page.locator("[data-name='save-new-workspace']");
        //Functions for products locator
        this.mainCategoryLocator = (mainCategory) =>
            this.page.locator(`label.group.sticky:has-text("${mainCategory}") > input[type='checkbox']`);        
        this.subCategoryLocator = (subCategory) =>
            this.page.locator(`label:not(.group.sticky):has-text("${subCategory}") > input[type='checkbox']`);    
        
    }

    async CreateWorkspace(workspaceName,mainCategory,subCategories)
    {
        if (!workspaceName) {
            throw new Error('Workspace name is required for creating a workspace.');
        }
    
        // Click the "New Workspace" button
        await this.dashboardPage.newWorkspace.click();
    
        // Wait for the search widget input to be visible
        await this.page.waitForSelector('input[placeholder="Search widget by name..."]', { state: 'visible' });
        // Verify widget search box visibility
        await expect(this.widgetSearchBox).toBeVisible();
        // Fill in the workspace name
        await this.workspaceName.fill(workspaceName);
        // Handle categories only if they are not null
        if (mainCategory || (subCategories && subCategories.length > 0)) {
            await this.selectCategories(mainCategory, subCategories);
        }
        // Save the workspace
        await this.saveWorkspace.click();
    }

    /**
     * Selects the main category and subcategories based on the provided arguments.
     * Handles cases where main and subcategories have the same name.
     * @param {string} mainCategory - The main category name (e.g., 'Prices').
     * @param {Array<string>} subCategories - Array of subcategory names (e.g., ['Prices', 'Price Comparison']).
     */

    async selectCategories(mainCategory, subCategories) {
        if (Array.isArray(mainCategory) && !subCategories) {
            subCategories = mainCategory; // Treat the first argument as subCategories
            mainCategory = null;
        }
        if(mainCategory){
            const mainCategoryCheckbox = this.mainCategoryLocator(mainCategory);
        if (!await mainCategoryCheckbox.first().isChecked()) {
            await mainCategoryCheckbox.first().check();
        }
        else {
            console.log(`Main category '${mainCategory}' is already checked.`);
        }
        }
        if(subCategories && Array.isArray(subCategories)){
            for (const subCategory of subCategories) {
                const subCategoryCheckbox = this.subCategoryLocator(subCategory);
                if (!await subCategoryCheckbox.first().isChecked()) {
                    await subCategoryCheckbox.first().check();
                }
                else {
                    console.log(`Subcategory '${subCategory}' is already checked.`);
                }
            }
        }
        
    }
    }
    module.exports = {NewWorkspacePage};