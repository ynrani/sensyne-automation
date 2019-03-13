const client = require('request-promise');

const apiClient = {


    header: () => {

        return {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
    },

    headerWithToken: (token, contentType) => {

        if (typeof token === 'undefined' || token === null) {
            token = helpers.getToken();

        }

        if (typeof contentType === 'undefined' || contentType === null) {
            contentType = '"Content-Type": "application/x-www-form-urlencoded",'

        }
        logger.info(' === CONTENT TYPE ====', contentType);

        return {
            contentType,
            'Authorization': 'Bearer ' + token
        };
    },

    makeRequest: async (url, header, method, body, statusCode, json = true) => {

        if (typeof  body === 'undefined' || body === null) {
            body = '';
        }
        let options = {
            uri: url,
            headers: header,
            method: method,
            body: body,
            json: json,
            time: true,
            rejectUnauthorized: false,
            resolveWithFullResponse: true,
        };
        logger.info(' === REQUEST ====', options);

        return client(options)
            .then(response => {
                if (statusCode != null) {
                    expect(response.statusCode).to.equal(statusCode);
                    logger.info('API Response time : ' + response.timings.response);
                }
                return response.body;
            });
    }
};

module.exports = apiClient;