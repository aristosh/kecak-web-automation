var automation = require('./index');
var webdriver = require('selenium-webdriver');

var automate = automation.build('http://kecak.kinnarastudio.com:8080/kecak/web/', webdriver, 'chrome');
automate.login('admin', 'password123');
automate.go('/userview/training_zakiy/appTraining');
automate.userviewClickMenu('List');
automate.datalistPage(2);
automate.datalistClick("test rb", 5);


//automate.quit();
