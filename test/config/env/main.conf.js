const user = null;
const request = require('request-promise');

let tags, tag;

exports.config = {

    // =======================
    // Docker Environment
    // =======================
    //Uncomment these variables to overide the default selenium host if you are using
    //docker to run selenium.  Leave this alone if you are using selenium-standalone from
    //your node modules or from a different location on your local machine.
    //
    // host: '192.168.99.100',
    // port: '4444',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    // debug: true,
    // execArgv: ['--inspect-brk=127.0.0.1:5859'],
    specs: [
        // './test/features/loginLogout.feature',
        // './test/features/**/*.feature',
    ],
    // Patterns to exclude.
    exclude: [],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    capabilities: [
        // {
        //     browserName: 'chrome',
        //     platform: 'MAC',
        // version: '66.0',
        // maxInstances: '1',
        // },
        // {
        //     browserName: 'chrome',
        //     platform: 'WINDOWS',
        //     version: '66.0',
        //     maxInstances: '1',
        // },
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    // logLevel: 'verbose',
    // logLevel: 'silent',
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './test/reports/errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 30000,

    //Default interval for all waitForXXX commands.
    waitforInterval: 500,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 20000,
    //
    // Default request retries count
    connectionRetryCount: 10,

    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.

    services: ['screenshots-cleanup'],

    // services: ['selenium-standalone', 'screenshots-cleanup'],

    // services: ['browserstack', 'screenshots-cleanup'],
    // user: browserstack.users.ck.BROWSERSTACK_USERNAME,
    // key: browserstack.users.ck.BROWSERSTACK_ACCESS_KEY,
    // browserstackLocal: true,
    // browserstackDebug: true,
    // browserstackNetworkLogs: true,

    cleanScreenshotsFolder: {
        folder: './test/reports/',
        pattern: '/**/*'
    },

    framework: 'cucumber',

    //
    // Test reporter for stdout.
    // The following are supported: dot (default), spec, and xunit
    // see also: http://webdriver.io/guide/testrunner/reporters.html
    reporters: ['spec', 'junit', 'allure'],
    reporterOptions: {
        allure: {
            outputDir: './test/reports/allure-results/',
        },
        junit: {
            outputDir: './test/reports/junit/'
        }
    },
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: ['./test/step_definitions/'],   // <string[]> (file/dir) require files before executing features
        backtrace: true,   // <boolean> show full backtrace for errors
        compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: true,    // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: false,     // <boolean> hide step definition snippets for pending steps
        source: false,       // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: false,      // <boolean> fail if there are any undefined or pending steps
        // tags: ['@uk', '~@spb', '~@defect', '~@disabledOnPROD'],
        timeout: 60000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: true, // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    //
    // =====
    // Hooks
    // =====
    // WedriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed once before all workers get launched.
    onPrepare: function () { //eslint-disable-line object-shorthand
        require('babel-register')({
            blacklist: [
                'regenerator',
            ],
        });
    },
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    before: function () { //eslint-disable-line object-shorthand
        const chai = require('chai'); //eslint-disable-line no-var
        const helpers = require('../../utils/helpers');
        const sessionDataStore = require('../../session/sessionDataStore');
        const navigation = require('../../utils/navigation');
        global.envConfig = require('./dev/testData');
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();
        global.helpers = helpers;
        global.sessionDataStore = sessionDataStore;
        global.navigation = navigation;
        global.userCategory = user;
        global.scenarioTags = tags;
        global.scenarioTag = tag;
        global.logger = require('winston');
        // browser.windowHandleFullscreen();

        // let handle = browser.windowHandle();
        // browser.windowHandleSize(handle, {width: 400, height: 300});
        // browser.windowHandleMaximize();
        // browser.setViewportSize({width: 768, height: 1024});

    },
};
