const loginPage = require('../pages/frontend/loginPage');
const clinicalScanPage = require('../pages/frontend/clinicalScanPage');
const deviceActivationPage = require('../pages/frontend/deviceActivationPage');
const patientScanPage = require('../pages/frontend/patientScanPage');
const interval = require('interval-promise');
const moment = require('moment');

let url, token;


module.exports = {

    spinner:                                      {value : 'circle'},
    error:                                        {value : '[class="well well--message well--error"] div'},
    /**
     *  COMMON ACTIONS - STEPS
     */


    getUrl: () => {

        if (userCategory === 'spb') {
            url = envConfig.spbBaseUrl;
        } else {
                url = '';
        }

        return url;
    },

    assertElementByElementText: (selector, expected, index = 1) => {
        let actual='';
        browser.waitUntil(function () {
            actual = helpers.getElementTextFromListOfElements(selector, index);
            return  actual === expected
        }, envConfig.defaultWaitUntilTimeout, 'Expected : '+ expected + '\nActual : ' + actual , envConfig.defaultPollingTime);
    },

    assertPageByElementExisting: (selector) => {
        let actual='';
        browser.waitUntil(function () {
            actual = browser.isExisting(selector);
            return  actual === true
        }, envConfig.defaultWaitUntilTimeout, ' ELEMENT DOES NOT EXIST', envConfig.defaultPollingTime);
    },

    assertPageTitle: (expected) => {
        let actual='';
        browser.waitUntil(function () {
            actual = browser.getTitle();
            return actual === expected
        }, envConfig.defaultWaitUntilTimeout, 'Expected : '+ expected + '\nActual : ' + actual , envConfig.defaultPollingTime);
    },

    acceptCookie: () => {
        if (browser.isVisible(registrationPage.acceptCookie.value)) {
            helpers.click(registrationPage.acceptCookie.value);
        }
    },

    setValue: function (selector, value) {
        helpers.elementToBeClickable(selector);
        helpers.click(selector);
        browser.clearElement(selector);
        browser.keys(value);
    },

    click: function (selector) {
        try {
            helpers.waitElementEnabled(selector);
            browser.click(selector);
            // browser.pause(1000);

        } catch (e) {
            helpers.waitElementEnabled(selector);
            browser.click(selector);
        }
    },

    elementToBeClickable: function (selector) {

        browser.waitUntil(function () {
            return browser.isExisting(selector) === true
        });

        browser.waitUntil(function () {
            return browser.isVisible(selector) === true
        });

        browser.waitUntil(function () {
            return browser.isEnabled(selector) === true
        });
    },

    getCurrentDateTime: function () {

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();


        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        if (hours < 10) {
            hours = '0' + hours
        }

        if (minutes < 10) {
            minutes = '0' + minutes
        }

        if (seconds < 10) {
            seconds = '0' + seconds
        }

        return dd + '/' + mm + '/' + yyyy + ' ' + hours + ':' + minutes + ':' + seconds;
    },

    getCurrentDateTimeFormatted: function () {
        return helpers.getCurrentDateTime().replace(/\//g, '').replace(/:/g, '').replace(' ', '');
    },

    shiftCurrentTime: function (minutes) {

        let today = new Date();
        today.setMinutes(today.getMinutes()-minutes);
        let shiftedHours = today.getHours();
        let shiftedMinutes = today.getMinutes();

        if (shiftedHours < 10) {
            shiftedHours = '0' + shiftedHours
        }

        if (shiftedMinutes < 10) {
            shiftedMinutes = '0' + shiftedMinutes
        }

        return `${shiftedHours}${shiftedMinutes}`
    },

    navigate: (pageToNavigate, parameter) => {
        let url = helpers.getUrl();

        pageToNavigate = pageToNavigate.toLowerCase();

        if (typeof parameter === 'undefined' || parameter === null) {
            parameter = '';
        }

        switch (pageToNavigate) {

            case 'loginasm':
                browser.url(url + envConfig.url.loginASM);
                helpers.assertPageId(loginPage.pageId.value);
                break;

            case 'login':
                browser.url(url + envConfig.url.login);
                if (browser.isExisting(loginPage.usernameInput.value)) {
                    loginPage.assertLoginPage();
                }
                break;


            default:
                logger.info('==== Please define the page to navigate !!!! ====');
                break;
        }
    },

    login: (username, password) => {

        helpers.navigate('login');

        if (browser.isVisible(loginPage.usernameInput.value)) {
            loginPage.login(username, password);
        }

    },

    loginToSendEntry(){
        navigation.navigate(envConfig.url.activation);
        clinicalScanPage.assertPage();
        deviceActivationPage.enterActivationCode(envConfig.activationCode);
        clinicalScanPage.assertPage();
    },

    scanBarcode(selector, id){
        helpers.waitElementAppear(selector);
        browser.selectorExecute(selector, function (elem) {
            return elem;
        });

        browser.keys(id);
        browser.keys('Enter');
    },

    getText: (selector) => {
        browser.waitUntil(function () {
            return browser.isVisible(selector) === true;
        },envConfig.defaultWaitUntilTimeout,
            'Could not find element after: ' + envConfig.defaultWaitUntilTimeout,
            envConfig.defaultPollingTime);

        return browser.getText(selector);
    },

    clinicalOnChart(){
        helpers.loginToSendEntry();
        clinicalScanPage.scanBarcode(envConfig.sendEntryId);
        patientScanPage.assertPage();
        patientScanPage.scanPatient(envConfig.sendEntryPatientId);
        patientScanPage.confirmPatient();
    },

    setToken: (tkn) => {
        token = tkn;
    },

    getToken: () => {
        return token;
    },

    // Note:
    // use function getTextViaHTML when element you are selecting is not adhering to interactable definition (https://www.w3.org/TR/webdriver/#element-interactability)
    // that must be satisfied when using browser.getText(selector)
    getTextViaHTML: (selector) => {
        browser.waitForExist(selector, envConfig.defaultWaitUntilTimeout);
        return  browser.getHTML(selector, false);
    },

    filter: (array, expectedValue) => {
        return array.filter(function (item) {
            return item[0] === expectedValue;
        });

    },

    /**
     *
     *  COMMON ACTIONS FOR ELEMENT FROM LIST OF ELEMENTS
     */

    getElementTextFromListOfElements: (selector, itemIndex) => {
        let elements, element;

            browser.waitUntil(function () {
                return (browser.elements(selector).value).length !== 0
            });

            elements = browser.elements(selector);
            element = elements.value[itemIndex];

            return browser.elementIdText(element.ELEMENT).value;

    },

    getElementAttributeValueFromListOfElements: (selector, itemIndex, attributeName) => {
        let elements, element;

        if (typeof attributeName === 'undefined' || attributeName === null ){
            attributeName = 'value';
        }

            browser.waitUntil(function () {
                return (browser.elements(selector).value).length !== 0
            });

            elements = browser.elements(selector);
            element = elements.value[itemIndex];

                return browser.elementIdAttribute(element.ELEMENT, attributeName).value;

    },

    getElementFromListOfElementsWithExpectedValue: (selector, expectedValue) => {
        let elements, elem, found = false;

        expectedValue = expectedValue.toLowerCase();

        browser.waitUntil(function () {
            return (browser.elements(selector).value).length !== 0
        });

        elements = browser.elements(selector);
        elements.value.forEach((element) => {

            let actual = browser.elementIdText(element.ELEMENT).value;
            actual = actual.toLowerCase().trim();

            if (actual === expectedValue && found === false) {

                found = true;
                elem = element;
                return element;
            }

        });
        return elem;
    },

    getLastElementFromListOfElements: (selector) => {
        let elements, lastElementIndex;

        browser.waitUntil(function () {
            return (browser.elements(selector).value).length !== 0
        });

        elements = browser.elements(selector);
        lastElementIndex = elements.value.length - 1;

        return elements.value[lastElementIndex];
    },

    getFirstElementFromListOfElements: (selector) => {
        let elements;

			browser.waitUntil(function () {
				return (browser.elements(selector).value).length !== 0
			});

        elements = browser.elements(selector);

        return elements.value[0];
    },

    getElementCounts: (selector) => {

        browser.waitUntil(function () {
            return (browser.elements(selector).value).length !== 0
        });

        return (browser.elements(selector).value).length;
    },

    waitSpinnerDisappear: () => {

        browser.waitUntil(function () {
            return browser.isExisting(helpers.spinner.value) === false
        });

    },

    waitElementDisappear: (selector) => {

        browser.waitUntil(function () {
            return browser.isExisting(selector) === false
        });

    },

    waitElementAppear: (selector) => {

        browser.waitUntil(function () {
            return browser.isExisting(selector) === true
        });

    },

    waitElementEnabled: (selector) => {

        try {

            browser.waitUntil(function () {
                return browser.isEnabled(selector) === true
            },envConfig.defaultWaitUntilTimeout, ' === ELEMENT IS NOT ENABLED === \n',envConfig.defaultPollingTime);

        } catch (e) {

            browser.waitUntil(function () {
                return browser.isEnabled(selector) === true
            },envConfig.defaultWaitUntilTimeout, ' === ELEMENT IS NOT ENABLED === \n',envConfig.defaultPollingTime);
        }

    },

    waitErrorDisappear: () => {

        browser.waitUntil(function () {
            return browser.isVisible(helpers.error.value) === false
        });

    },

    clickElementFromListOfElements: (selector, itemIndex) => {
        let elements, element;

        browser.waitUntil(function () {
            return (browser.elements(selector).value).length !== 0
        });


        elements = browser.elements(selector);
        element = elements.value[itemIndex];

        browser.waitUntil(function () {
            return browser.elementIdEnabled(element.ELEMENT).value === true;
        });

        browser.elementIdClick(element.ELEMENT);

    },

    setValueToElementFromListOfElements: (selector, itemIndex, string) => {
        let elements, element;

        elements = browser.elements(selector);
        element = elements.value[itemIndex];

        browser.elementIdClear(element.ELEMENT);
        browser.elementIdValue(element.ELEMENT, string);


    },

    selectLastItemOnDropDown: (selector) => {
        let element = helpers.getLastElementFromListOfElements(selector);
        browser.elementIdClick(element.ELEMENT);
    },

    /**
     *
     * REUSABLE CART FORM ACTIONS
     */

    isElementPresentInList: (selector, searchMode, value) => {
        let isMatch, array = [];

        browser.waitUntil(function () {
            return (browser.elements(selector).value).length !== 0
        });

        array = helpers.getListOfElementsBySelector(selector);

        switch (searchMode) {
            case envConfig.searchMode.find:
                isMatch = array.indexOf(value) === -1 ? false : true;
                break;
            case envConfig.searchMode.pattern:
                isMatch = array.some(function(item) { return item.match(value); });
                break;
        }
        return isMatch;
    },

    getListOfElementsBySelector: (selector) => {
        let elements, array = [];

        browser.waitUntil(function () {
            return (browser.elements(selector).value).length !== 0
        });
        elements = browser.elements(selector).value;

        for(let index = 0; index < elements.length; index++) {
            array[index] = helpers.getElementTextFromListOfElements(selector, index);
        }
        return array;
    },

    formatToBoolean: (displayedFlag) => {
        switch (displayedFlag) {
            case 'should':
                return true;
            case 'should not':
                return false;
            default:
                return displayedFlag;
        }
    },

    getPlaceholderValue: (elem) => {
        return browser.getAttribute(elem,'placeholder');
    },

    //returns only the digits from a string
    extractDigitsFromString: (text) => {
        return text.replace(/^\D+/g, '');
    },

    //verifies if customer number is in format 0001234567
    verifyTextMatch: (text) => {
        let matchText = /^[0]{3}[1-9]{7}$/g;
        return matchText.test(text);
    },

};
