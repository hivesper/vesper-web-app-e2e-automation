class LoginPage {

    constructor(page)
    {
        if (!page) {
            throw new Error('A valid Playwright page instance is required to initialize LoginPage.');
        }
        this.page = page;
        this.emailText = page.locator("#floating_outlined-email");
        this.passwordText = page.locator("#floating_outlined-password");
        this.submitBtn = page.locator("[type='submit']");
        this.forgotPasswordLink = page.getByText('Forgot password?');
        this.errorMessage = page.locator("[data-test-handle='error-message']");
    }
    
    async goTo()
    {
        await this.page.goto(process.env.BASE_URL);
    }
    
    async Login(username,password)
    {
        if (!username || !password) {
            throw new Error('Both username and password are required for login.');
        }
        await this.emailText.fill(username);
        await this.passwordText.fill(password);
        await this.submitBtn.click();
    }
    async clickForgotPassword() {
        await this.forgotPasswordLink.click();
    }
    async getErrorMessage() {
        return this.errorMessage.textContent();
    } 
    }
    module.exports = {LoginPage};