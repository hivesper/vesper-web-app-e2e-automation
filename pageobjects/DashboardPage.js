const { expect } = require('@playwright/test');
const { Utility } = require('../utilities/Utility');

class DashboardPage {
    constructor(page) {
        if (!page) {
            throw new Error('A valid Playwright page instance is required to initialize POManager.');
        }
        this.page = page;
        this.pageTitle = page.locator("[data-test-handle='page-title']");
        this.newWorkspace = page.getByRole('button', { name: 'New workspace' });
        this.utility = new Utility(page);
        // Delete Workspace link
        this.deleteWorkspaceLink = page.locator("[data-name='workspace-delete']");
        this.deleteWorkspaceMessageHeader = page.locator("h1:has-text('Are you sure?')");
        this.deleteWorkspaceConfirm = page.locator("button:has-text('Delete')");
        // Dynamic locator for workspace tab
        this.workspaceLocator = (workspaceName) =>
            this.page.locator(`[data-name="dashboard-tab-${workspaceName}"]`);

        // Dynamic locator for workspace options under a specific workspace
        this.workspaceOptionsLocator = (workspaceName) =>
            this.page.locator(`[data-name="dashboard-tab-${workspaceName}"] [data-name="workspace-options"]`);
    }

    /**
     * Checks if a workspace is visible on the dashboard.
     * @param {string} workspaceName - The name of the workspace to check.
     * @returns {Promise<boolean>} - Returns true if visible, false otherwise.
     */
    async isWorkspaceVisible(workspaceName) {
        const workspaceElement = this.workspaceLocator(workspaceName);
        console.log("Workspace selector in func:", workspaceElement);

        try {
            await workspaceElement.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (error) {
            console.log(`Workspace "${workspaceName}" not found or not visible.`);
            return false;
        }
    }

    /**
     * Deletes a workspace by interacting with its options menu.
     * @param {string} workspaceName - The name of the workspace to delete.
     * @returns {Promise<void>}
     */
    async deleteWorkspace(workspaceName) {
        const optionsLocator = this.workspaceOptionsLocator(workspaceName);
        console.log(`Attempting to delete workspace: ${workspaceName}`);
        try {
            // Ensure the workspace options button is visible and click it
            await optionsLocator.waitFor({ state: 'visible', timeout: 5000 });
            await optionsLocator.click();
            await this.deleteWorkspaceLink.waitFor({ state: 'visible', timeout: 5000});
            await this.deleteWorkspaceLink.click();
            await this.waitForTimeout(5000);
            await expect(this.deleteWorkspaceMessageHeader).toBeVisible();
            await expect(this.deleteWorkspaceConfirm).toBeVisible();
            await this.deleteWorkspaceConfirm.waitFor({ state: 'visible', timeout: 5000});
            await this.deleteWorkspaceConfirm.click();
        } catch (error) {
            console.log(`Failed to find or interact with options for workspace "${workspaceName}".`);
        }
    }
}

module.exports = { DashboardPage };
