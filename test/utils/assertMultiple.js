const _ = require('lodash');


let assertionError = '';
const strictEqual = (actual, expected, errorMessage) => {
    try {
        assert.strictEqual(actual, expected, errorMessage)
    } catch (err) {
        assertionError = `${assertionError} ${err.message}\n`;
    }
};
const isNotNull = (actual, expected, errorMessage) => {
    try {
        assert.isNotNull(actual, errorMessage)
    } catch (err) {
        assertionError = `${assertionError} ${err.message}\n`;
    }
};

const verifyAll = () => {
    if (assertionError !== '') {
        const myErrMsg = assertionError;
        assertionError = '';
        throw new Error(myErrMsg);
    }
};

const getMatcher = (matcher) => {
    if (_.isFunction(matcherMethods[matcher])) {
        return matcherMethods[matcher];
    }
    throw new Error(`"${matcher}" does not exist - use\n${Object.keys(matcherMethods).join('\n')}`);
}

const matcherMethods = {
    strictEqual,
    isNotNull
}
module.exports = {
    getMatcher,
    verifyAll,
    ...matcherMethods,
}