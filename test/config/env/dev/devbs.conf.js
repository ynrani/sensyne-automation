const main = require('../main.conf');
const merge = require('deepmerge');
const localIdentifier = `foobar_${Math.round(Math.random() * 100)}_${Date.now()}`;
const user = null;
const request = require('request-promise');

let tags, tag;

exports.config = merge(main.config, {

    specs: [
        // './test/features/loginLogout.feature',
        // './test/features/**/*.feature',
    ],

    suites: {
        group1: [
        // './test/features/loginLogout.feature',
        ],
        group2: [
            // './test/features/xxxx.feature',
        ]

    },

    capabilities: [
        {
            browserName: 'chrome',
            platform: 'WINDOWS',
            version: '68.0',
            maxInstances: 10,
            'resolution': '1600x1200',
            'browserstack.local': true,
            'browserstack.debug': true,
            'browserstack.localIdentifier': localIdentifier,
            'browserstack.idleTimeout': "60",
        },
    ],

    logLevel: 'silent',
    baseUrl: 'https://dev.sensynehealth.com/',

    bail: 1,

    cucumberOpts: {
        tags: ['@uk','@smoke', '~@defect', '~@WIP'],
    },

    // services: ['selenium-standalone', 'screenshots-cleanup'],
    services: ['browserstack', 'screenshots-cleanup'],
    user: browserstackKeys.users.ck.BROWSERSTACK_USERNAME,
    key: browserstackKeys.users.ck.BROWSERSTACK_ACCESS_KEY,

    // Code to start browserstack local before start of test
    onPrepare: function (config, capabilities) {
        console.log("Connecting BrowserStack Local...");
        return new Promise(function (resolve, reject) {
            exports.bs_local = new browserstack.Local();
            exports.bs_local.start({
                'key': exports.config.key,
                'force': 'true',
                'localIdentifier': localIdentifier
            }, function (error) {
                if (error) return reject(error);
                console.log('Connected. Now testing...');

                resolve();
            });
        });
    },

    // Code to stop browserstack local after end of test
    // after: function (capabilties, specs) {
    //     exports.bs_local.stop(function() {});
    // },

    before: function () {


        const chai = require('chai'); //eslint-disable-line no-var
        const helpers = require('../../../utils/helpers');
        global.envConfig = require('./testData');
        global.expect = chai.expect;
        global.should = chai.should();
        global.helpers = helpers;
        global.apiHelper = require('../../../utils/apiHelper');
        global.scenarioTags = tags;
        global.scenarioTag = tag;
        global.logger = require('winston');
        browser.windowHandleMaximize();
    }
});
