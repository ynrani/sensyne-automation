const patientScanPage =  {

    /**
     * Patient Scan page
     */

    pageAssertionElement:                    {value : '#login'},
    patientIdInput:                          {value : '#patientID'},
    patientName:                             {value : 'h4'},
    confirmPatientYesButton:                 {value : '#confirmPatientYesDialogBtn'},


    assertPage() {
        helpers.assertPageByElementExisting(patientScanPage.pageAssertionElement.value);
    },

    scanPatient(id){
        helpers.scanBarcode(patientScanPage.patientIdInput.value, id);
    },

    confirmPatient(){
        helpers.assertElementByElementText(patientScanPage.patientName.value, envConfig.patientName, 0);
        helpers.click(patientScanPage.confirmPatientYesButton.value);
    },


};

module.exports = patientScanPage;
