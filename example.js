var automation = require('./index');
var webdriver = require('selenium-webdriver');

var driver = automation.build('http://kecak.kinnarastudio.com:8080/kecak/web/', webdriver, 'chrome');
driver.login('admin', 'password123');
/*
driver.go('/userview/training_zakiy/appTraining');
driver.userviewClickMenu('');
driver.datalistPage(2);
driver.datalistClick("test rb", 5);
*/

driver.go('http://cloud.kinnarastudio.com:8080/kecak/web/userview/testDatalistInbox/userview1');
driver.userviewClickMenu('Form1');
driver.formElementSet('field1', 'outer');
driver.formElementSet('field3', '2b97500d-ac1f2796-4dffe8d3-259562b3;2b9e323b-ac1f2796-4dffe8d3-eca3138d');
driver.formElementSet('field4', '2b97500d-ac1f2796-4dffe8d3-259562b3');
driver.formGridElementAdd('field5');
driver.formElementSet('field1','kambing');
driver.formGridElementSubmit();
//driver.quit();
