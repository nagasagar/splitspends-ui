import { LoginPage } from '../pages/login.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('test if site is alive', async () => {
    await page.navigate();
    expect(await browser.getTitle()).toEqual('Splitspends');
  });

  it('test login with username and passowrd', async () => {
    await page.navigate();
    await page.performLogin('nsagar@gmail.com', 'splitspends');
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl + 'home/friends');
  });

  it('test navigation to registration page from login page', async () => {
    await page.navigate();
    await page.clickOnRegisterBtn();
    expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl + 'register');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
