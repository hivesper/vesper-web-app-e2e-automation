const { user } = require("../utilities/credentials");
const { Utility } = require('../utilities/Utility');

class ForgotPasswordPage {

    constructor(page)
    {
        if (!page) {
            throw new Error('A valid Playwright page instance is required to initialize ForgotPassword page.');
        }
        this.page = page;
        // this.emailText = page.locator("#floating_outlined-email");
        this.emailText = page.locator("[type='email']")
        this.sendInsBtn = page.getByRole('button', {name:'Send instructions'});
        this.forgotMessage = page.locator("p:has-text(\"No problem, we'll send you reset instructions\")");
        this.errorMessage = page.locator("p:has-text(\"We can't find a user with that e-mail address.\")");
        this.utility = new Utility(page); 
    }

    async sendInstructions(username) {
        await this.emailText.fill(username);
        await this.sendInsBtn.click();
    }

    async verifyErrorMessage(expectedMessage) {
        await this.utility.verifyTextContent(this.errorMessage, expectedMessage);
    }
    
    }
    module.exports = {ForgotPasswordPage};