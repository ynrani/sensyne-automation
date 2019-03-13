module.exports = {


    navigate: (pageToNavigate) => {

        pageToNavigate = pageToNavigate.toLowerCase();

        switch (pageToNavigate) {

            case 'activation':
                browser.url(envConfig.url.sendEntry + envConfig.url.activation);
                break;

            case 'login':
                browser.url(envConfig.url.login);
                break;

            case 'admin':
                browser.url(envConfig.url.admin);
                break;

            case 'patients':
                browser.url(envConfig.url.patients);
                break;


            default:
                browser.url(envConfig.url.activation);
                logger.info('==== Please define the page to navigate !!!! ====');
                break;
        }
    },


};
