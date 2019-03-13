const main = require('../main.conf');
const merge = require('deepmerge');
const localIdentifier = `foobar_${Math.round(Math.random() * 100)}_${Date.now()}`;
const user = null;
const request = require('request-promise');

let tags, tag;
var timeouts = process.env.DEBUG ? 999999999 : 30000;
// if you want to run your tests in debug DEBUG=true npm run dev
exports.config = merge(main.config, {
    specs: [
        // './test/features/loginLogout.feature',
        // './test/features/deviceActivation.feature',
        // './test/features/chart.feature',
        // './test/features/observation.feature',
        './test/features/**/*.feature',
    ],

    suites:{
        group1:[
            // './test/features/loginLogout.feature',
        ],
        group2:[
            // './test/features/promotions.feature',
        ]

    },

    capabilities: [
        {
            browserName: 'chrome',
            chromeOptions: {
                mobileEmulation: {'deviceName': 'iPad'},
                // args: ['window-size=500,1200']
            },
            // platform: 'WINDOWS',
            // version: '68.0',
            maxInstances: 1,
            // 'resolution' : '1600x1200',
            // 'browserstack.local': true,
            // 'browserstack.debug': true,
            // 'browserstack.localIdentifier': localIdentifier,
            // 'browserstack.idleTimeout':"30",
        },
    ],

    logLevel: 'silent',
    baseUrl: 'https://dev.sensynehealth.com/',

    cucumberOpts: {
        // tags: ['@charlie'],
        // timeout: timeouts

    },

    // services: ['appium'],

    // appium: {
    //     args: {
    //         address: '127.0.0.1',
    //         commandTimeout: '7200',
    //         sessionOverride: true,
    //         debugLogSpacing: true,
    //         platformVersion: '9.1',
    //         platformName: 'iOS',
    //         showIosLog: true,
    //         deviceName: 'iPhone 6',
    //         nativeInstrumentsLib: true,
    //         isolateSimDevice: true,
    //         app: APP_PATH
    //     }
    // },
    // services: ['selenium-standalone', 'screenshots-cleanup'],

    port: '9515',
    path: '/',
    services: ['chromedriver'],


    // services: ['browserstack', 'screenshots-cleanup'],
    // user: browserstackKeys.users.ck.BROWSERSTACK_USERNAME,
    // key: browserstackKeys.users.ck.BROWSERSTACK_ACCESS_KEY,

    // Code to start browserstack local before start of test
    // onPrepare: function (config, capabilities) {
    //     console.log("Connecting BrowserStack Local...");
    //     return new Promise(function (resolve, reject) {
    //         exports.bs_local = new browserstack.Local();
    //         exports.bs_local.start({
    //             'key': exports.config.key,
    //             'force': 'true',
    //             'localIdentifier': localIdentifier
    //         }, function (error) {
    //             if (error) return reject(error);
    //             console.log('Connected. Now testing...');
    //
    //             resolve();
    //         });
    //     });
    // },

    // Code to stop browserstack local after end of test
    // after: function (capabilties, specs) {
    //     exports.bs_local.stop(function() {});
    // },

});
