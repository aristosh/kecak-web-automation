var automation = require('./index');
var webdriver = require('selenium-webdriver');

var automate = automation.build('http://10.10.1.62:8080/jw/web', webdriver, 'chrome');
automate.login('dep0', 'Csf1@2017');
automate.go('/userview/etracking_sop/userview1/_/inboxSKDir');
automate.clickUserviewMenu('Inbox IK');

//automate.quit();
