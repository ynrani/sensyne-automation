const chartPage =  {

    /**
     *  Chart page
     */

    pageAssertionElement:              {value : '#headerLinkAdmin'},
    nextButton :                       {value : "#dataEntryNextBtn"},
    time :                             {value : "time"},
    displayedTime:                     {value : "now"},
    temperature :                      {value : "temperature"},
    bloodPressure :                    {value : "bloodPressure"},
    heartRate :                        {value : "heartRate"},
    respiratoryRate :                  {value : "respiratoryRate"},
    o2SaturationPercentage :           {value : "o2Saturation"},
    o2Therapy :                        {value : "o2Therapy"},
    o2TherapyValue :                   {value : "#obsReading_o2Therapy_readingValue"},
    o2TherapySubLabel :                {value : "#obsReading_o2Therapy_subLabel"},
    acvpu :                            {value : "ACVPU"},
    clinicalConcern :                  {value : "clinicalConcern"},
    validationText :                   {value : "validationErrorMessage_dataEntry"},
    saveButton :                       {value : "dataEntrySaveBtn"},
    refusedButton :                    {value : "dataEntryRefusedBtn"},
    keypad:                            {value : "#dataEntrynumber"},
    maskOptionKeypad:                  {value : "#maskOptionsnumber"},
    keypadSpecialKey:                  {value : "(//button[@id='specialKey'])[1]"},
    validationError:                   {value : "#validationErrorMessage_dataEntry"},
    deleteKey:                         {value : "(//button[@id='deleteKey'])[1]"},


    assertPage(){
      helpers.assertPageByElementExisting(chartPage.pageAssertionElement.value);
    },

    clickNext() {
        helpers.waitSpinnerDisappear();
        helpers.click(chartPage.nextButton.value);
    },

    enterTime(time) {

        chartPage.findObsContainer(chartPage.time.value);
        chartPage.clearInput(time);
        chartPage.clickKeypadValue(time);
        chartPage.clickNext();
 
    },

    validateTime(time) {
        if (time !== chartPage.displayedTime.value){
            time = time.replace(/(^.{2})/g, '$1\:')
        }
        chartPage.validateObsValueDisplay(chartPage.time.value, time);
    },

    enterTemperatureValue(temperature) {

       chartPage.findObsContainer(chartPage.temperature.value);
       chartPage.clickKeypadValue(temperature);
       chartPage.clickNext();

   },

    validateTemperatureValue(temperature) {

        chartPage.validateObsValueDisplay(chartPage.temperature.value, temperature);
    },

    validateTemperatureBounds() {

        chartPage.validateErrorDisplayed("Temperature")
    },

    enterBloodPressure(systolic, diastolic, posture) {

        chartPage.findObsContainer(chartPage.bloodPressure.value);
        chartPage.clickKeypadValue(`${systolic}/${diastolic}`);
        if (posture) chartPage.clickPostureButton(posture) ;
        chartPage.clickNext();
    },

    clickPostureButton(posture) {
        helpers.click('#readinIcon_icon-' + posture);
    },

    validateBloodPressure(systolic, diastolic) {

        chartPage.validateObsValueDisplay(chartPage.bloodPressure.value, `${systolic}/${diastolic}`);
    },

    enterHeartRate(heartRate) {

        chartPage.findObsContainer(chartPage.heartRate.value);
        chartPage.clickKeypadValue(heartRate);
        chartPage.clickNext();
    },

    validateHeartRateValue(heartRate) {

        chartPage.validateObsValueDisplay(chartPage.heartRate.value, heartRate)
    },

    enterRespiratoryRate(respiratoryRate) {

        chartPage.findObsContainer(chartPage.respiratoryRate.value);
        chartPage.clickKeypadValue(respiratoryRate);
        chartPage.clickNext();
    },

    validateRespiratoryRateValue(respiratoryRate) {

        chartPage.validateObsValueDisplay(chartPage.respiratoryRate.value, respiratoryRate)
    },

    enterO2SaturationPercentage(o2SaturationPercentage) {

        chartPage.findObsContainer(chartPage.o2SaturationPercentage.value);
        chartPage.clickKeypadValue(o2SaturationPercentage);
        chartPage.clickNext();
    },

    validateO2SaturationPercentage(o2SaturationPercentage) {

        chartPage.validateObsValueDisplay(chartPage.o2SaturationPercentage.value, o2SaturationPercentage)
    },

    enterO2Therapy(mask_type, mask_type_secondary, o2_therapy_value) {
        chartPage.findObsContainer(chartPage.o2Therapy.value);
        helpers.click('#maskBtn_' + mask_type);

        switch (mask_type) {

            case "roomAir" :
                helpers.click('#maskBtn_roomAir');
                break;

            case "venturi":
                helpers.click('#maskOption_' + mask_type_secondary);
                chartPage.clickKeypadValue(o2_therapy_value);
                break;

            case "humidified":
                helpers.click('#maskOption_' + mask_type_secondary);
                chartPage.clickKeypadValue(o2_therapy_value);
                break;
            
            case "simple":
                  chartPage.clickKeypadValue(o2_therapy_value);
                  break;
            
            case "nasalCann":
                chartPage.clickKeypadValue(o2_therapy_value);
                break;
            
            case "resvMask":
                chartPage.clickKeypadValue(o2_therapy_value);
                break;
            
            case "trach":
                chartPage.clickKeypadValue(o2_therapy_value);
                break;
            
            case "cpap":
                chartPage.clickKeypadValue(o2_therapy_value);
                break;
            
            case "niv":
                chartPage.clickKeypadValue(o2_therapy_value);
                break;
            
            case "nebuliser":
                chartPage.clickKeypadValue(o2_therapy_value);
                break;

            case "highFlow":
                browser.pause(1000);
                chartPage.clickKeypadValue(mask_type_secondary,chartPage.maskOptionKeypad.value);
                helpers.click("#maskOptionsConfirmBtn");
                chartPage.clickKeypadValue(o2_therapy_value);
                break;

            default:
                chartPage.clickKeypadValue(o2_therapy_value);
                break;
        }


        chartPage.clickNext();
    },

    validateO2Therapy(mask_type, mask_type_secondary, value) {

        switch (mask_type) {
            case 'roomAir':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal("Room Air");
                break;

            case 'venturi':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(`${value} (L/min)`);
                expect(browser.getText(chartPage.o2TherapySubLabel.value)).to.equal(`Venturi ${mask_type_secondary}%`);
                break;

            case 'humidified':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(`${value} (L/min)`);
                expect(browser.getText(chartPage.o2TherapySubLabel.value)).to.equal(`Humidified ${mask_type_secondary}%`);
                break;

            case 'simple':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(`${value} (L/min)`);
                break;
            
            case 'nasalCann':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(`${value} (L/min)`);
                break;
            
            case 'resvMask':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(`${value} (L/min)`);
                break;
            
            case 'trach':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(`${value} (L/min)`);
                break;
            
            case 'cpap':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(`${value} (L/min)`);
                break;
            
            case 'niv':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(`${value} (L/min)`);
                break;
            
            case 'nebuliser':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(`${value} (L/min)`);
                break;

            case 'highFlow':
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(`${value} (L/min)`);
                expect(browser.getText(chartPage.o2TherapySubLabel.value)).to.equal(`High Flow ${mask_type_secondary}%`);
                break;

            default:
                expect(browser.getText(chartPage.o2TherapyValue.value)).to.equal(value);

        }
    },

    enterConsciousnessAvcpu(avcpuConsciousness) {
        chartPage.findObsContainer(chartPage.acvpu.value);
        helpers.click('#buttonList_' + avcpuConsciousness);
        chartPage.clickNext();
    },

    validateConsciousnessAvcpu(avcpuConsciousness) {
        chartPage.validateObsValueDisplay(chartPage.acvpu.value, avcpuConsciousness[0]);
    },

    enterNurseConcern(concern) {

        chartPage.findObsContainer(chartPage.clinicalConcern.value);
        helpers.click(`//div[@id='buttonList_${concern}']`);
        chartPage.findObsContainer(chartPage.acvpu.value);
    },

    validateNurseConcern(concern) {

        chartPage.validateObsValueDisplay(chartPage.clinicalConcern.value, "YES")
    },

    submitObservationSetFinal() {

        // Button id is still the same but on last obs becomes clickable save observations

        chartPage.findObsContainer(chartPage.clinicalConcern.value);
        chartPage.clickNext();
    },

    submitObservationSet() {
        helpers.click(chartPage.saveButton.value);
    },

    clickPatientRefused() {
        helpers.click(chartPage.refusedButton.value);
    },

    selectRefusedObservations(refused) {

    },

    validateRefused(refused) {

        chartPage.validateObsValueDisplay(observation, "rfd");
        // for observation in refused);
    },

    clickRefusedUpdate() {
        helpers.click("#update");
    },

    findObsContainer(observation_type) {
        let selector = '#obsReading_' + observation_type + '_label';
        helpers.click(selector);
    },

    validateObsValueDisplay(observationType, expected) {
        expect(browser.getText('#obsReading_' + observationType + '_readingValue')).to.equal(expected);
    },


    validateErrorDisplayed(text_contained) {
        expect(browser.getText(chartPage.validationError.value)).to.equal(text_contained);
    },

    clearInput(input) {
        let selector = chartPage.deleteKey.value;
        for (let i = 0; i < input.length; i++) {
            helpers.click(selector);
        }
    },

    clickKeypadValue(value, keypad=chartPage.keypad.value, keypadSpecialKey=chartPage.keypadSpecialKey.value) {

        for ( let i = 0 ; i < value.length; i++ ) {

            logger.info(' ======= VALUE =======', value[i]);
            let selector;
            if(value[i] === '/' || value[i] === '.'){

                selector = keypadSpecialKey;
            }
        
            else{

                selector = keypad + value[i];

            }

            helpers.click(selector);
        
        }   

    },

};

module.exports = chartPage;
