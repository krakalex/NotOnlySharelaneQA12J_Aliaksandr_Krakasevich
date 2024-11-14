import { describe } from "mocha";
import { Browser, Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import { expect } from "chai";
import assert from "assert"

describe('ShareLane', async () => {
  let driver: WebDriver;

  beforeEach(async() => {
    driver = await new Builder().forBrowser(Browser.EDGE).build();
    await driver.manage().window().maximize();
    await driver.get('https://sharelane.com/cgi-bin/main.py');
  });

  afterEach(async() => {
    await driver.quit()
  });

  it('Test 1: Sign Up via autogeneration and Log In using the generated user', async () => {
    await driver.findElement(By.css('a[href="../test_portal.html"]')).click();
    await driver.findElement(By.css('a[href="../cgi-bin/create_account.py"]')).click();
    await driver.findElement(By.css('input[type="submit"]')).click();
    await driver.findElement(By.css('input[type="submit"]')).click();
    await driver.wait(until.titleIs('ShareLane: Learn to Test'), 5000)
    const welcomeMessage = await driver.findElement(By.className('user')).getText();
    expect(welcomeMessage).to.include('Hello', 'Unsuccessful login')
  })

  it('Test 2: Sing Up via autogeneration and Log In using the generated user', async () => {
    await driver.findElement(By.css('a[href="./register.py"]')).click();
    await driver.findElement(By.name('zip_code')).sendKeys('220022')
    await driver.findElement(By.name('zip_code')).sendKeys(Key.ENTER);
    await driver.findElement(By.name('first_name')).sendKeys('Alex');
    await driver.findElement(By.name('email')).sendKeys('test@test.com');
    await driver.findElement(By.name('password1')).sendKeys('password');
    await driver.findElement(By.name('password2')).sendKeys('passwordxx');
    await driver.findElement(By.css('input[value="Register"]')).click();
    assert.equal(await driver.findElement(By.className('error_message')), 'Oops, error on page. Some of your fields have invalid data or email was previously used')
  })
})

  