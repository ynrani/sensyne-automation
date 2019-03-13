const apiClient = require('../apiClient');
const location = {
    createLocation: async (body) => {
        let url = envConfig.url.baseUrl + envConfig.api.dhosServices + envConfig.api.products.location;
        let timeStamp = helpers.getCurrentDateTime();
        let token = helpers.getToken();
        let header = apiClient.headerWithToken(token);
        return await apiClient.makeRequest(url, header, 'POST', body, 200);
    },

    getAllLocation: async () => {
        let url = envConfig.url.baseUrl + envConfig.api.dhosServices + envConfig.api.products.product + envConfig.api.products.send + envConfig.api.products.location;
        let body = '';
        let token = helpers.getToken();
        let header = apiClient.headerWithToken(token);
        let response = await apiClient.makeRequest(url, header, 'GET', body, 200, false);
        logger.info(' ======= RESPONSE ======', response[0].display_name);
    }
};

module.exports = location;