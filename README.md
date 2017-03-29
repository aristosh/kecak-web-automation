# Kecak Workflow Web Automation #

Web automation for Kecak Workflow or Joget Workflow with Selenium Project as its driver engine.

## Installation ##

```
npm install kecak-web-automation
```

## Quick Start ##

```
var webAutomation = require('kecak-web-automation');
var automate = webAutomation.build('http://yourserver:8080/kecak/', 'chrome');

// login as some user
automate.login('user', 'password');

// select application
automate.applicationSelect('App1');

// select some menu from userview
automate.userviewClickMenu('Form1');

// assign value to text field / checkbox / radio button
automate.formElementSet('field1', 'some value');

// add new form grid value
automate.formGridElementAdd('grid1');
automate.formElementSet('field2', 'some value for field inside form grid');
automate.formGridElementSubmit();
```
