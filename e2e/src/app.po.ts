import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return element(by.css('ion-title')).getText();
  }

  getLabel(labelName: string) {
    return element(by.className(labelName)).getText();
  }

  getButton(buttonName: string) {
    return element(by.className(buttonName)).getText();
  }

  clickButton(buttonName: string) {
    return element(by.className(buttonName)).click();
  }

  getSelect(selectName: string) {
    return element(by.className(selectName));
  }

  // not working yet
  getSelectOption(selectName: string, value: string) {
    const selectBox = this.getSelect(selectName);
    return selectBox.element(by.id('//ion-select-option[text()="' + value + '"]'));
  }
}
