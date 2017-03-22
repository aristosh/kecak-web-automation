class Automator {
  constructor(webContext, webdriver, driver) {
    this.webContext = webContext.replace(/\/$/, '');
    this.webdriver = webdriver;
    this.driver = driver;
    this.By = webdriver.By;
    this.until = webdriver.until;
  }

  /*
  * Login
  */
  login(username, password) {
    driver.get(this.webContext + '/desktop');
    driver.findElement(this.By.id('header-login')).click();
	driver.wait(this.until.elementLocated(this.By.name('j_username')),2000);
    driver.findElement(this.By.name('j_username')).sendKeys(username);
    driver.findElement(this.By.name('j_password')).sendKeys(password);
    driver.findElement(this.By.css("button[type=submit]")).click();
  }

  /*
  *  go to url
  */
  go(url) {
    if(url.match(/https?:\/\//))
      driver.get(url);
    else
      driver.get(this.webContext + "/" + url.replace(/^\//, ''));
  }

  /*`
  * 
  * menu : menu label 
  */
  userviewClickMenu(menu) {
    driver.wait(this.until.elementLocated(this.By.className("menu")), 5000);

    //Open submenu "List" in User View
    driver.findElement(this.By.partialLinkText(menu)).click();
  }

  /*
  * text : row contains
  * index : which column to be clicked, index starts from 1
  */
  datalistClick(text, index) {
    driver.findElement(this.By.xpath("//table/tbody/tr[td[contains(text(),'"+text+"')]]/td["+index+"]")).click();
  }

  /*
  * Go to page
  */
  datalistPage(page) {
    driver.findElement(this.By.className("pagelinks")).findElement(this.By.linkText(""+page)).click();
  }

  /*
  *  Set form element for current active windows
  */
  formElementSet(elementId, value) {
    driver.findElement(this.By.css("#"+elementId)).sendKeys(value);
  }

  formGridElementAdd(gridElementId) {
    // TODO
  }

  formGridFocus(gridElementId) {
    // TODO
  }

  formGridElementSubmit(gridElementId) {
    // TODO
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
