const clinicalScanPage =  {

    /**
     * Clinical Scan page
     */

    pageAssertionElement:                    {value : 'h3'},
    pageAssertionText:                       {value : 'Activate Device'},
    badgeNumberInput:                        {value : '#badgeNumber'},

    assertPage() {
        helpers.assertElementByElementText(clinicalScanPage.pageAssertionElement.value, clinicalScanPage.pageAssertionText.value);
    },

    scanBarcode(id) {
        helpers.scanBarcode(clinicalScanPage.badgeNumberInput.value, id);
    }
};

module.exports = clinicalScanPage;
