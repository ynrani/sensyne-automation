const chartPage = require('./chartPage');

const deviceActivationPage =  {

    /**
     * Device Activation page
     */

    codeInput:              {value : '#codeInput'},
    submitButton:           {value :'#activationSubmitBtn' },


    enterActivationCode(code){
        deviceActivationPage.selectInputField(deviceActivationPage.codeInput.value)
        chartPage.clickKeypadValue(code);
        deviceActivationPage.clickSubmitButton();
    },

    selectInputField(selector){
        helpers.click(selector);
    },

    clickSubmitButton() {
        browser.click(deviceActivationPage.submitButton.value);
    }
};

module.exports = deviceActivationPage;
