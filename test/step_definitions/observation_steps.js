const location = require('../api/services/location');
const clinician = require('../api/services/clinician');
const jwtToken = require('../api/jwtToken');
const chartPage = require('../pages/frontend/chartPage');
const sessionDataStorage = require('../session/sessionDataStore')
const locationReqBodies = require('../api/services/requestbody/locationReqBodies')
const sessionKeys = require('../session/sessionKeys')

module.exports = function () {

    this.Given(/^I am on chart$/, () => {
        helpers.clinicalOnChart();
    });

    this.Given(/^the token is generated$/, async () => {
        browser.call(async function generate() {
            await jwtToken.generateToken();
        })
    });

    this.Given(/^I create clinician$/, async () => {
        browser.call(async function generate() {
            await clinician.createClinician();
            await clinician.getClinicianById();
        })
    });
    this.Given(/^I create location/, async () => {
        browser.call(async () => {
            const reqBody = locationReqBodies.getCreateLocationReqBody();
            const response = await location.createLocation(reqBody);
            sessionDataStorage.setData(sessionKeys.LOCATION_CREATE_RESPONSE,response);
            sessionDataStorage.setData(sessionKeys.LOCATION_REQ_BODY, reqBody);
        })
    });
    this.Given(/^I get locations$/, async () => {
        browser.call(async function getLocations() {
            await location.createLocation();
        })
    });

    this.Then(/^Below observations should be displayed on the side$/, (data) => {

        data.raw().map( (subarray) => {
            let observation = subarray[0];

            switch (observation) {
                case 'Time':
                    let time = helpers.shiftCurrentTime(envConfig.timeShift);
                    chartPage.enterTime(time);
                    chartPage.validateTime(envConfig.currentTime);
                    break;

                case 'Temperature':
                    chartPage.enterTemperatureValue(envConfig.temperature);
                    chartPage.validateObsValueDisplay(chartPage.temperature.value,envConfig.temperature);
                    break;

                case 'Heart rate':
                    chartPage.enterHeartRate(envConfig.heartRate);
                    chartPage.validateObsValueDisplay(chartPage.heartRate.value,envConfig.heartRate);
                    break;

                case 'Blood pressure':
                    chartPage.enterBloodPressure(envConfig.bloodPressureSystolic, envConfig.bloodPressureDiastolic, envConfig.bloodPressurePosture);
                    chartPage.validateObsValueDisplay(chartPage.bloodPressure.value, `${envConfig.bloodPressureSystolic}/${envConfig.bloodPressureDiastolic}`);
                    break;

                case 'Respiratory rate':
                    chartPage.enterRespiratoryRate(envConfig.respiratoryRate);
                    chartPage.validateObsValueDisplay(chartPage.respiratoryRate.value, envConfig.respiratoryRate);
                    break;

                case 'O2 saturation':
                    chartPage.enterO2SaturationPercentage(envConfig.o2SaturationPercentage);
                    chartPage.validateObsValueDisplay(chartPage.o2SaturationPercentage.value, envConfig.o2SaturationPercentage);
                    break;

                case 'O2 therapy':
                    chartPage.enterO2Therapy(envConfig.maskType,envConfig.maskTypeSecondary, envConfig.o2TherapyValue);
                    chartPage.validateO2Therapy(envConfig.maskType,envConfig.maskTypeSecondary, envConfig.o2TherapyValue);
                    break;

                case 'Consciousness':
                    chartPage.enterConsciousnessAvcpu(envConfig.avcpuConsciousness);
                    chartPage.validateConsciousnessAvcpu(envConfig.avcpuConsciousness);
                    break;

                case 'Clinical concern':
                    chartPage.enterNurseConcern(envConfig.clinicianConcern);
                    chartPage.validateNurseConcern(envConfig.clinicianConcern);
                    break;

                default:
                    logger.info(` OBSERVATION "${observation}" NOT FOUND  !!!!!`);
                    break;
            };
        });

    });
    this.Then(/^A warning should be displayed for entering the below observations incorrectly$/, (data) => {
        data.raw().map( (subarray) => {
            let observation = subarray[0];

            switch (observation) {
                case 'Time':
                    let time = helpers.shiftCurrentTime(envConfig.invalidTimeShift);
                    chartPage.enterTime(time);
                    chartPage.validateErrorDisplayed('You can only enter values within the past 4 hours');
                    chartPage.clearInput(time)
                    break;

                case 'Temperature':
                    chartPage.enterTemperatureValue(envConfig.invalidTemperature);
                    chartPage.validateErrorDisplayed('Temperature should be between 28 and 45');
                    chartPage.clearInput(envConfig.invalidTemperature)
                    break;
    
                case 'Heart rate':
                    chartPage.enterHeartRate(envConfig.invalidHeartRate);
                    chartPage.validateErrorDisplayed('Heart rate should be between 20 and 220');
                    chartPage.clearInput(envConfig.invalidHeartRate);
                    break;
    
                case 'Blood pressure':
                    chartPage.enterBloodPressure(envConfig.invalidBloodPressureSystolic,envConfig.invalidBloodPressureDiastolic, envConfig.bloodPressurePosture);
                    chartPage.validateErrorDisplayed('Please enter both Systolic and Diastolic');
                    chartPage.clearInput(envConfig.invalidBloodPressureSystolic);
                    break;
                
                case 'Respiratory rate':
                    chartPage.enterRespiratoryRate(envConfig.invalidRespiratoryRate);
                    chartPage.validateErrorDisplayed('Respiratory rate should be between 4 and 60');
                    chartPage.clearInput(envConfig.invalidRespiratoryRate);
                    break;
                
                case 'O2 saturation':
                    chartPage.enterO2SaturationPercentage(envConfig.invalidO2SaturationPercentage);
                    chartPage.validateErrorDisplayed('O₂ saturation should be between 40 and 100');
                    chartPage.clearInput(envConfig.invalidO2SaturationPercentage);
                    break;

                case 'O2 therapy':
                    chartPage.enterO2Therapy(envConfig.maskType,envConfig.maskTypeSecondary, envConfig.invalidO2TherapyValue);
                    chartPage.validateErrorDisplayed('Flow rate should be between 0.5 and 100');
                    chartPage.clearInput(envConfig.invalidO2TherapyValue);
                    break;

                default:
                    logger.info(` OBSERVATION "${observation}" NOT FOUND  !!!!!`);
                    break;
            };
        });
    });

};