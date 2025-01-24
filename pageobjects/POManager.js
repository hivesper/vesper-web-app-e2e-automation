const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {ForgotPasswordPage} = require('./ForgotPasswordPage');
const {NewWorkspacePage} = require('./NewWorkspacePage');

class POManager
{
constructor(page)
{
    if (!page) {
        throw new Error('A valid Playwright page instance is required to initialize POManager.');
    }
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.forgotPasswordPage = new ForgotPasswordPage(this.page);
    this.newWorkspacePage = new NewWorkspacePage(this.page);
}

getLoginPage()
{
    return this.loginPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}

getForgotPasswordPage()
{
    return this.forgotPasswordPage;
}

getNewWorkspacePage()
{
    return this.newWorkspacePage;
}

}
module.exports = {POManager};