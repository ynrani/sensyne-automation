const dashboardPage = require('./dashboardPage');

const loginPage =  {

    /**
     * Login page
     */

    dashboardTitle:                    {value : 'GDm-Health : Log in'},
    usernameInput:                     {value : '#username'},
    passwordInput:                     {value : '#password'},
    loginButton:                       {value : '#btn-login'},


    login: (username, password) => {

        if ( typeof username === 'undefined' || username == null){
            username = envConfig.users.midWife.username
        }

        if ( typeof password === 'undefined' || password == null){
            password = envConfig.users.midWife.password

        }
        helpers.setValue(loginPage.usernameInput.value, username);
        helpers.setValue(loginPage.passwordInput.value, password);
        helpers.clickElementFromListOfElements(loginPage.loginButton.value, 0);
    },

    clickOnForgotPasswordLink: () => {
        helpers.click(loginPage.forgotPasswordLink.value);
    },

    assertLoginPage: () => {
        let loginPageTitle = browser.getTitle();
        expect(loginPageTitle).to.equal(loginPage.dashboardTitle.value);
    },

    logout: () => {
        helpers.click(dashboardPage.menuHamburger.value);
        helpers.click(dashboardPage.logoutButton.value);
        browser.waitForExist(loginPage.usernameInput.value);
    },

    logoutViaLink: () => {
        helpers.click(dashboardPage.logoutLink.value);
        browser.waitForExist(loginPage.usernameInput.value);
    }

};

module.exports = loginPage;
