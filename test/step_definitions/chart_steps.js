const clinicalScanPage = require('../pages/frontend/clinicalScanPage');
const patientScanPage = require('../pages/frontend/patientScanPage');
const chartPage = require('../pages/frontend/chartPage');

module.exports = function () {


    this.Given(/^I am on logged in as Midwife to Send Entry$/, () => {
        helpers.loginToSendEntry();
    });

    this.Given(/^I scan my barcode$/, () => {
        clinicalScanPage.scanBarcode(envConfig.sendEntryId);
    });

    this.When(/^I scan patient wristband$/, () => {
        patientScanPage.assertPage();
        patientScanPage.scanPatient(envConfig.sendEntryPatientId);
    });

    this.Then(/^I confirm patient$/, () => {
        patientScanPage.confirmPatient();

    });

    this.Then(/^the chart should be loaded$/, () => {
        chartPage.assertPage()
    });


};