# vesper-web-app-e2e-automation
Playwright Javascript E2E Automation for WebApp
### Overview

This project is a web automation suite developed using Playwright. It incorporates a structured page object model (POM) for maintaining clean, reusable, and scalable code. The suite handles login, workspace creation, dashboard navigation, and more. 

### Folder and File Structure

Below is a breakdown of the files provided and their purposes:

### Configuration Files

playwright.config.js: Contains the Playwright test configuration, including test directory, timeout, reporter, and browser settings.

### Environment and Dependencies

.env: Contains environment variables such as API endpoints, user credentials, or other sensitive data required for running the tests.

package.json: Manages the project's dependencies, scripts, and metadata.

### Utility and Manager Files

Utility.js: Provides helper functions or utility methods commonly used across the test suite.

POManager.js: Implements the Page Object Manager pattern, centralizing the creation and access of page objects.

### Page Object Model Files

LoginPage.js: Encapsulates the login page's elements and functionalities.

ForgotPasswordPage.js: Handles elements and operations for the forgot password functionality.

DashboardPage.js: Manages interactions with the dashboard.

NewWorkspacePage.js: Provides methods for creating and interacting with new workspaces.

### Test Files

Login.spec.js: Contains test scenarios for verifying login functionalities.

CreateWorkspace.spec.js: Validates workspace creation workflows.

Credentials and Test Data

credentials.js: Stores test credentials securely.

Login.json: Includes login-related test data.

CreateWorkspace.json: Contains test data for workspace creation scenarios.

### Prerequisites

Node.js installed (v16 or higher recommended).

Playwright installed as a dependency.

Environment variables configured in the .env file.

Test credentials stored securely in Bitwarden or as specified in the credentials.js file.

### Installation

1. Clone the repository:
``` git clone https://github.com/hivesper/vesper-web-app-e2e-automation.git ```

2. Navigate to the project directory::
``` cd <project_directory> ```
3. Install dependencies
``` npm install ```

### Running tests
To execute the tests, use the following commands:

 - Run all tests:
 ``` npx playwright test ```
 - Run a specific test file:
 ``` npx playwright test <test_file_name> ```
 - Generate HTML report
 ``` npx playwright show-report ```
 
 
### Project Highlights

Page Object Model (POM): Ensures code reusability and separation of concerns.

Environment Configuration: Sensitive data and configurations are managed securely through .env and credentials.js.

Scalability: The utility functions and POM facilitate the easy addition of new test cases and functionalities.

### Future Enhancements

Include test result artifacts in this repository or link them to a shared storage location.

Expand automation to cover additional workflows and edge cases.

