var automation = require('./index');

var automate = automation.build('http://kecak.kinnarastudio.com:8080/kecak/', 'chrome');
automate.login('admin', 'password123');
/*
automate.go('/userview/training_zakiy/appTraining');
automate.userviewClickMenu('');
automate.datalistPage(2);
automate.datalistClick("test rb", 5);
*/
automate.applicationSelect('Userview 1');
automate.userviewClickMenu('Form1');
automate.formElementSet('field1', 'kuda');
automate.formElementSet('field3', '2b97500d-ac1f2796-4dffe8d3-259562b3;2b9e323b-ac1f2796-4dffe8d3-eca3138d');
automate.formGridElementAdd('field5');
automate.formElementSet('field1','kambing');
automate.formGridElementSubmit();
automate.formElementSet('field4', '2b97500d-ac1f2796-4dffe8d3-259562b3');
//automate.quit();
