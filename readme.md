## Sensyne Health Automation Framework 


### Installation Guide

#### How to clone the Git repo
```

Step 1 - log in to Github 


Step 2 - clone the repo   

git clone git@github.com:draysontechnologies/sensyne-automation.gitClone:https://github.com/draysontechnologies/sensyne-automation.git


You can also manually download the repo 
Download: https://github.com/draysontechnologies/sensyne-automation.zip
 


Pre-requisite
OS: Mac

Install below written libraries from here : 
https://nodejs.org/download/release/v8.12.0/

Note : When you install node it comes with npm !

npm 6.4.0
node 8.12.0 

Open Terminal and check if machine has installed : 
npm -v


If not, then run the following to install node version 8 (steps taken from (https://medium.com/@katopz/how-to-install-specific-nodejs-version-c6e1cec8aa11): 
 brew search node 
 brew unlink node
 brew install node@8
 brew link node@8


and then run:
 sudo chown -R $(whoami) $(brew --prefix)/*
 brew link --overwrite node@8 --force

```

Once installed perform the below written steps.

```

# To run your test locally, you'll need a local selenium server running, you can install and launch a selenium standalone server with chrome, firefox and phantomjs drivers via the following commands in a separate terminal:


sudo npm install selenium-standalone@latest -g --save-dev

sudo selenium-standalone install

```

then cd into the project folder and run
```

npm i

```


#### Usage

```bash

Structure: 


npm run local

Examples - npm script :

npm run local // to run test on your local machine 

npm run dev // to run test on DEV    

Example - command line : 


node_modules/.bin/wdio test/config/local.conf.js    // from the command line go to the project directory


node_modules/.bin/wdio test/config/dev.conf.js --suites login // will run only login suite which has been defined in xxx.conf.js file


node_modules/.bin/wdio test/config/dev.conf.js --cucumberOpts.tags @login // will run only @login tagged scenarios against DEV env

```
