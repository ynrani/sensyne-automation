
const locationRequestBody = {
    getCreateLocationReqBody: () => {
        let timeStamp = helpers.getCurrentDateTime();
        return {
            "location_type": timeStamp,
            "ods_code": "BLW",
            "display_name": `ApiAutomation${timeStamp}`,
            "dh_products": [{ "product_name": "SEND", "opened_date": "2000-01-01" }]
        };
    }
}
module.exports = locationRequestBody;