//var async = require('async');
var seleniumWebdriver = require('selenium-webdriver');
var fs = require('fs');

var driver;
var By = seleniumWebdriver.By;
var until = seleniumWebdriver.until;
var Key = seleniumWebdriver.Key;

var automator;

class Automator {
  /*
    Constructor

    @params
      webContext : website's base url
      driver : can be chrome, phantomjs, firefox, ie
  */
  constructor(webContext) {
    this.webContext = webContext.replace(/\/$/, '');

    // go to base url
    driver.get(webContext);
  }

  /*
    Login

    @params
      username : string
      passworc : string
  */
  login(username, password) {
    automator = this;

    driver.findElement(By.id('header-login')).click();
    driver.wait(until.elementLocated(By.name('j_username')),2000);
    driver.findElement(By.name('j_username')).sendKeys(username);
    driver.findElement(By.name('j_password')).sendKeys(password);
    driver.findElement(By.css("button[type=submit]")).click().then(() => {
      automator.writeLog('login : as username [' + username + ']');
    });
   
  }

  /*
    Logout
  */
  logout() {
    this.writeLog('logout');
    driver.findElements(By.id('logoutText')).then(function(es) {
      for(var i in es) {
        (function() {
          es[i].click();
        })();
      }
    });
  }

  /*
    Select application
  */
  applicationSelect(app) {
    this.writeLog('applicationSelect : application [' + app + ']');
    driver.getWindowHandle().then(currentWindowHandle => {
    driver.wait(until.elementLocated(By.linkText(app)));
    driver.getCurrentUrl().then(function(url) {
      if(!url.match(/\/web\/desktop/)) {
        driver.get(webContext + '/web/desktop');
      }
      driver.findElements(By.linkText(app)).then(es => {
        for(var i in es) {
          var e = es[i];
          (function() {
            e.getText().then(text => {
              if(text == app) {
                this.writeLog('applicationSelect : selecting [' + text + ']');
                e.sendKeys(Key.ENTER);
                driver.getAllWindowHandles().then(handles => {
                  for(var j in handles) {
                    // TODO : potential bugs if more than 2 windows found
                    if(handles[j] !== currentWindowHandle) {
                      driver.switchTo().window(handles[j]);
                      break;
                    }
                  }
                });
              }
            })
          })();
        }
      });
    });
    });
  }

  /*
  *  go to url
  */
  go(url) {
    var writeLog = this.writeLog;
    if(url.match(/https?:\/\//))
      driver.get(url).then(function() {
        writeLog('go : url [' + url + ']')
      });
    else
      driver.get(this.webContext + "/" + url.replace(/^\//, '')).then(function() {
        console.log(writeLog);
        writeLog('go : url [' + url + ']');
      });
  }

  /*
  * 
  * menu : menu label 
  */
  userviewClickMenu(menu) {
    driver.wait(until.elementLocated(By.className("menu")));

    //Open submenu "List" in User View
    var writeLog = this.writeLog;
    driver.findElement(By.partialLinkText(menu)).then(e => {
      writeLog('userviewClickMenu : menu [' + menu + ']');
      return e.click();
    });
  }

  /*
  * text : row contains
  * index : which column to be clicked, index starts from 1
  */
  datalistClick(text, index) {
    this.writeLog('datalistClick : text [' + text + '] index [' + index + ']');
    driver.findElement(By.xpath("//table/tbody/tr[td[contains(text(),'"+text+"')]]/td["+index+"]")).click();
  }

  /*
    Go to page
  */
  datalistPage(page) {
    this.writeLog('detalistPage : page [' + page + ']');
    driver.findElement(By.className("pagelinks")).findElement(By.linkText(""+page)).click();
  }

  /*
    Set form element for current active windows
 
    @parameters
      elementId : string; element id
      value : string | array; multivalue string should be semicolon(;) delimited value
      valueAsLabel : boolean; for selectbox, checkbox, and radiobutton specify if the 'value' parameter is passed as label. Has no effect on any other element
  */
  formElementSet(elementId, value, valueAsLabel = false) {
    var writeLog = this.writeLog;
    driver.wait(until.elementLocated(By.css("[name='"+elementId+"']")));

    var formElement = driver.findElement(By.css("[name='"+elementId+"']"));
    var type;
    var arrValue = Array.isArray(value) ? value : value.split(/;/);

    formElement.getAttribute("type").then(function (typeName) {
      type = typeName;
    });

    formElement.getTagName().then( function(tagName) {
      if(tagName == "select") {
        for(var i in arrValue) {
          var item = arrValue[i];
          formElement.findElement(By.xpath("../div[@class]")).click();
   
          if(valueAsLabel) {
            writeLog('formElementSet : element id [' + elementId + '], value [' + value + '], value as label [' + valueAsLabel + ']');
            driver.findElement(By.xpath("//ul[@class='chosen-results']/li[contains(text(), '"+item+"')]")).click();
          }
        }
      } else if(tagName == "input" && (type == "radio" || type == "checkbox")) {
        for(var i in arrValue) {
          var item = arrValue[i];

          writeLog('formElementSet : element id [' + elementId + '], value [' + item + '], value as label [' + valueAsLabel + ']');
          if(valueAsLabel)
            driver.findElement(By.xpath("//input[@id='"+elementId+"' and ../text()[normalize-space(.)='"+item+"']]")).click();
          else
            driver.findElement(By.css("#" + elementId + "[value='" + item + "']")).click();
        }
      } else {
        formElement.sendKeys(value);
      }
    });
  }

  /*
    Click form element based on locator
  */
  formElementClick(cssLocator) {
     driver.findElement()
  }

  /*
    Add new item to grid
  */
  formGridElementAdd(gridElementId) {
    driver.findElement(By.css("div#formgrid_" + gridElementId + " a.grid-action-add")).click();
  
    var frame = driver.wait(until.elementLocated(By.css("iframe#formGridFrame_formgrid_" + gridElementId)));
    driver.switchTo().frame(frame);
  }

  /*
    Submit a grid form
  */
  formSubmit() {
    driver.wait(until.elementLocated({id : 'submit'})).then(function(e) {
      e.sendKeys(Key.ENTER);
      driver.switchTo().defaultContent();
    });
  }

  /*
    quit browser
  */
  quit() {
    driver.quit();
    this.writeLog('quit : exiting browser');
  }

  /*
    Take screeshot and save using date in ISO as filename
  */
  screenshot() {
    driver.takeScreenshot().then(base64 => {
      let now = new Date();
      fs.writeFile(now.toISOString() + '.png', base64, 'base64', err => {
        if(err)
          automator.writeError(err);
        else
          automator.writeLog('screenshot : filename [' + now.toISOString() + ']');
      });
    });
  }

  /*
    Retrive selenium driver
  */
  getDriver() {
    return driver;
  }

  writeLog(log) {
    console.log(log);
  }

  writeError(err) {
    if(err)
      console.error(err);
  }
}

var kecakDriver = {
  build : function(webContext, forBrowser) {
    driver = new seleniumWebdriver.Builder().forBrowser(forBrowser).build();
    return new Automator(webContext);
  }
}

module.exports = kecakDriver;
