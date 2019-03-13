const apiClient = require('./apiClient');
const jwtTokenReqBody = require('../api/services/requestbody/jwtReqBody')

const jwtToken = {
    generateToken: async () => {
        let token = await apiClient.makeRequest(envConfig.url.sandBox, apiClient.header(), 'POST', jwtTokenReqBody.getReqBody(), 200);
        helpers.setToken(token.access_token);
    }
};

module.exports = jwtToken;