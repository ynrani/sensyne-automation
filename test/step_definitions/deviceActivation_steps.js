const clinicalScanPage = require('../pages/frontend/clinicalScanPage');
const deviceActivationPage = require('../pages/frontend/deviceActivationPage');

module.exports = function () {


    this.Given(/^I am on device activation page$/, () => {
        navigation.navigate(envConfig.url.activation);
        clinicalScanPage.assertPage();
    });

    this.When(/^I enter device activation code$/, () => {
        deviceActivationPage.enterActivationCode(envConfig.activationCode);
    });

    this.Then(/^I should be redirected to clinical scan page$/, () => {
        clinicalScanPage.assertPage();
    });


};