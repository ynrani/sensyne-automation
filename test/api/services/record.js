const record = {

    getLocation: async () => {

        let body = 'grant_type=http://auth0.com/oauth/grant-type/password-realm&realm=dev-users&' +
            'client_id=jpvbEJUhH3SFgZ6Kfd0E95QLFwP2d3nB&' +
            'audience=https://dev.sensynehealth.com/&' +
            'username=wolrab@mail.com&' +
            'password=Pass@word1!&scope=';
        let token = await apiClient.makeRequest('https://login-sandbox.sensynehealth.com/oauth/token', 'POST', body, 200);

        logger.info(' ======= JWT TOKEN ======', token);
    }
};

module.exports = record;