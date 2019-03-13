const loginPage = require('../pages/frontend/loginPage');
const dashboardPage = require('../pages/frontend/dashboardPage');

module.exports = function () {


    this.Given(/^I am logged in as (.+) user$/, (userType) => {

        switch (userType) {
            case 'Patient Manager':
                helpers.login(envConfig.users.patientManager.username, envConfig.users.patientManager.password);
                break;

            case 'Midwife':
                helpers.login(envConfig.users.midWife.username, envConfig.users.midWife.password);
                break;

            case 'IT Admin':
                helpers.login(envConfig.users.itAdmin.username, envConfig.users.itAdmin.password);
                break;

            default:
                helpers.login(envConfig.users.itAdmin.username, envConfig.users.itAdmin.password);
                break;

        }
    });

    this.When(/^I enter username (.+) password (.+)$/, (username, password) => {
        loginPage.login(username, password);
    });

    this.When(/^I enter (.+) customer username password$/, (userType) => {


        switch (userCategory) {
            case 'spb':
                helpers.loginSPB();
                break;

            case 'hfr':
                loginPageFR.login();
                break;

            default:
                helpers.login();
                break;
        }
    });

    this.When(/^I logout over logout button$/, function () {
        loginPage.logout();
    });

    this.When(/^I logout over logout link$/, function () {
        loginPage.logoutViaLink();
    });

    this.When(/^I click on Forgot password link$/, function () {
        loginPage.clickOnForgotPasswordLink();
    });

    this.Then(/^I should be logged in on Dashboard page$/, () => {
        helpers.assertPageTitle(dashboardPage.dashboardTitle.value);
    });

    this.Then(/^I should be logged in on Sensyne Hub page$/, () => {
        helpers.assertPageTitle(dashboardPage.sensyneHubTitle.value);
    });

    this.Then(/^I should be redirected to login page$/, () => {
        loginPage.assertLoginPage();
    });

};