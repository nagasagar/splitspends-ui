import { browser, by, element } from 'protractor';

export class LoginPage {

  userId = element(by.css('app-login input.e2e-login-username'));
  password = element(by.css('app-login input.e2e-login-password'));
  loginBtn = element(by.css('app-login button.e2e-login-submit'));
  fbloginBtn = element(by.css('app-social .btn-social.btn-facebook'));
  googleloginBtn = element(by.css('app-social .btn-social.btn-google'));
  registerBtn = element(by.css('app-login bbutton.e2e-login-register'));

  async navigate(): Promise<void> {
    await browser.get(browser.baseUrl);
  }

  async setUserName(username: string): Promise<void> {
    await this.userId.sendKeys(username);
  }

  async setPassword(passwrd: string): Promise<void> {
    await this.password.sendKeys(passwrd);
  }

  async clickOnLoginBtn(): Promise<void> {
    await this.loginBtn.click();
  }

  async performLogin(username: string, passwrd: string): Promise<void> {
    browser.waitForAngularEnabled(false);
    await this.setUserName(username);
    await this.setPassword(passwrd);
    await this.clickOnLoginBtn();
    browser.waitForAngularEnabled(true);
  }

}
