import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('The Traveler', () => {
    let page: AppPage;

    beforeAll(() => {
        page = new AppPage();
        page.navigateTo();
    });

    describe('First Tab', () => {

        it('should display title on first tab', () => {
            page.navigateTo();
            expect(page.getPageTitle()).toContain('The Traveler');
        });

        it('should show first select label', () => {
            expect(page.getLabel('depart-label')).toContain('Where do you depart from?');
        });

        it('should show second select label', () => {
            expect(page.getLabel('destination-label')).toContain('What is your destination?');
        });

        it('should show search button', () => {
            expect(page.getButton('submit')).toContain('SEARCH');
        });

        it('should show message after clicking button without selection', () => {
            page.clickButton('submit');
            expect(page.getLabel('error-message')).toContain('Please make a selection before clicking \'Search\'');
        });

        xit('should select a departure country', () => {
            page.getSelectOption('depart-select', 'Greece').click();
        });

        xit('should select a destination country', () => {
            page.getSelectOption('destination-select', 'Netherlands').click();
        });

        xit('should continue clicking submit button', () => {
            page.clickButton('submit');
            expect(page.getLabel('error-message')).toContain('');
        });
    });
});
