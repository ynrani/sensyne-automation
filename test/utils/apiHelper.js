const apiHelper = {

    retrieveBaseUrlWithoutEndpoints: () => {
        let baseUrl = browser.options.baseUrl;

        if (baseUrl.includes('devblue-fr')) {
            return baseUrl.replace(/(\/..\/...\/..\/...)/, '');
        } else {
            return baseUrl.replace(/(\/...\/..\/...)/, '');
        }
    }
};

module.exports = apiHelper;
