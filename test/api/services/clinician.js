const apiClient = require('../apiClient');

let header, response;
let url = envConfig.url.baseUrl + envConfig.api.dhosServices;
let email = helpers.getCurrentDateTimeFormatted() + "@nhs.com";

const clinician = {

    createClinician: async () => {

        url = url + envConfig.api.products.clinician;

        header = apiClient.headerWithToken();

        let body = {
            "first_name": envConfig.testUser.firstName,
            "last_name": envConfig.testUser.lastName,
            "phone_number": envConfig.testUser.phoneNumber,
            "nhs_smartcard_number": envConfig.testUser.nhsSmartcardNumber,
            "email_address": email,
            "job_title": envConfig.testUser.jobTitle,
            "locations": ["L1", "L2"],
            "groups": ["GDM Superclinician"],
            "products": [{
                "product_name": envConfig.api.products.name,
                "opened_date": envConfig.testUser.openedDate
            }]
        };
        response = await apiClient.makeRequest(url, header, 'POST', body, 200);

        logger.info(' ======= RESPONSE BODY ======', response);
    },

    getClinicianByEmail: async () => {

        let body = '';
        let token = await apiClient.makeRequest('', 'POST', body, 200);

        logger.info(' ======= JWT TOKEN ======', token);
    },

    getClinicianById: async () => {

        url = url + '/' + response.uuid;

        let body = '';
        let responseGetClinicianById = await apiClient.makeRequest(url, header, 'GET', body, 200, false);
        responseGetClinicianById = JSON.parse(responseGetClinicianById);


        expect(responseGetClinicianById.email_address).to.equal(email);
        expect(responseGetClinicianById.uuid).to.equal(response.uuid);
        expect(responseGetClinicianById.first_name).to.equal(envConfig.testUser.firstName);
        expect(responseGetClinicianById.last_name).to.equal(envConfig.testUser.lastName);
    },

    updateClinicianById: async () => {

        let body = '';
        let token = await apiClient.makeRequest('', 'POST', body, 200);

        logger.info(' ======= JWT TOKEN ======', token);
    },

    loginClinician: async () => {

        let body = '';
        let token = await apiClient.makeRequest('', 'POST', body, 200);

        logger.info(' ======= JWT TOKEN ======', token);
    },

    createNewTermsForClinician: async () => {

        let body = '';
        let token = await apiClient.makeRequest('', 'POST', body, 200);

        logger.info(' ======= JWT TOKEN ======', token);
    },

    deleteClinician: async () => {

        let body = '';
        let token = await apiClient.makeRequest('', 'POST', body, 200);

        logger.info(' ======= JWT TOKEN ======', token);
    }
};

module.exports = clinician;