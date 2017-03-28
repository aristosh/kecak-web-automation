class Automator {
  constructor(webContext, webdriver, driver) {
    this.webContext = webContext.replace(/\/$/, '');
    this.webdriver = webdriver;
    this.driver = driver;
    this.By = webdriver.By;
    this.until = webdriver.until;
    this.Key = webdriver.Key;
  }

  /*
  * Login
  */
  login(username, password) {
    this.driver.get(this.webContext + '/desktop');
    this.driver.findElement(this.By.id('header-login')).click();
    this.driver.wait(this.until.elementLocated(this.By.name('j_username')),2000);
    this.driver.findElement(this.By.name('j_username')).sendKeys(username);
    this.driver.findElement(this.By.name('j_password')).sendKeys(password);
    this.driver.findElement(this.By.css("button[type=submit]")).click();
  }

  /*
  *  go to url
  */
  go(url) {
    if(url.match(/https?:\/\//))
      this.driver.get(url);
    else
      this.driver.get(this.webContext + "/" + url.replace(/^\//, ''));
  }

  /*`
  * 
  * menu : menu label 
  */
  userviewClickMenu(menu) {
    this.driver.wait(this.until.elementLocated(this.By.className("menu")), 5000);

    //Open submenu "List" in User View
    this.driver.findElement(this.By.partialLinkText(menu)).click();
  }

  /*
  * text : row contains
  * index : which column to be clicked, index starts from 1
  */
  datalistClick(text, index) {
    this.driver.findElement(this.By.xpath("//table/tbody/tr[td[contains(text(),'"+text+"')]]/td["+index+"]")).click();
  }

  /*
    Go to page
  */
  datalistPage(page) {
    this.driver.findElement(this.By.className("pagelinks")).findElement(this.By.linkText(""+page)).click();
  }

  /*
    Set form element for current active windows
  */
  formElementSet(elementId, value) {
    this.driver.wait(this.until.elementLocated(this.By.css("#" + elementId)));
    this.driver.findElements(this.By.css("#" + elementId)).then(function(es) {
      for(var i in es) {
        (function() {
          var e = es[i];
          e.getAttribute('type').then(function(type) {
            if(type == 'checkbox') {
              var arrValue = Array.isArray(value) ? value : value.split(';');
              for(var j in arrValue) {
                (function() {
                  var arrItem = arrValue[j];
                  e.getAttribute('value').then(function(value) {
                    if(value == arrItem) {
                      e.click();
                    }
                  });
                })();
              }
            } else if(type == 'radio') {
              e.getAttribute('value').then(function(radioValue) {
                if(value == radioValue) {
                  e.click();
                }
              });
            } else {
              e.sendKeys(value);
            }
          });
        })();
      }
    });
  }

  /*
    Add new item to grid
  */
  formGridElementAdd(gridElementId) {
    this.driver.findElement(this.By.css("div#formgrid_" + gridElementId + " a.grid-action-add")).click();
  
    this.frame = this.driver.wait(this.until.elementLocated(this.By.css("iframe#formGridFrame_formgrid_" + gridElementId)));
    this.driver.switchTo().frame(this.frame);
  }

  /*
    Submit a grid form
  */
  formGridElementSubmit() {
    var Key = this.Key; 
    this.driver.wait(this.until.elementLocated({id : 'submit'})).then(function(e) {
      e.sendKeys(Key.ENTER);
      driver.switchTo().defaultContent();
    });
  }

  /*
  * quit browser
  */
  quit() {
    this.driver.quit();
  }
}

var kecakDriver = {
  build : function(webContext, webdriver, forBrowser) {
    driver = new webdriver.Builder().forBrowser(forBrowser).build();
    return new Automator(webContext, webdriver, driver);
  }
}

module.exports = kecakDriver;
