/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BlackListComponentsPage, BlackListDeleteDialog, BlackListUpdatePage } from './black-list.page-object';

const expect = chai.expect;

describe('BlackList e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let blackListUpdatePage: BlackListUpdatePage;
    let blackListComponentsPage: BlackListComponentsPage;
    let blackListDeleteDialog: BlackListDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load BlackLists', async () => {
        await navBarPage.goToEntity('black-list');
        blackListComponentsPage = new BlackListComponentsPage();
        expect(await blackListComponentsPage.getTitle()).to.eq('avayaBloomAdminApp.blackList.home.title');
    });

    it('should load create BlackList page', async () => {
        await blackListComponentsPage.clickOnCreateButton();
        blackListUpdatePage = new BlackListUpdatePage();
        expect(await blackListUpdatePage.getPageTitle()).to.eq('avayaBloomAdminApp.blackList.home.createOrEditLabel');
        await blackListUpdatePage.cancel();
    });

    it('should create and save BlackLists', async () => {
        const nbButtonsBeforeCreate = await blackListComponentsPage.countDeleteButtons();

        await blackListComponentsPage.clickOnCreateButton();
        await promise.all([
            blackListUpdatePage.setBlacknumberInput('blacknumber'),
            blackListUpdatePage.numberSourceSelectLastOption(),
            blackListUpdatePage.setValidityPeriodInput('5'),
            blackListUpdatePage.setAddReasonInput('addReason'),
            blackListUpdatePage.setApplicantInput('applicant'),
            blackListUpdatePage.setCreatetimeInput('createtime'),
            blackListUpdatePage.setChangetimeInput('changetime')
        ]);
        expect(await blackListUpdatePage.getBlacknumberInput()).to.eq('blacknumber');
        expect(await blackListUpdatePage.getValidityPeriodInput()).to.eq('5');
        expect(await blackListUpdatePage.getAddReasonInput()).to.eq('addReason');
        expect(await blackListUpdatePage.getApplicantInput()).to.eq('applicant');
        expect(await blackListUpdatePage.getCreatetimeInput()).to.eq('createtime');
        expect(await blackListUpdatePage.getChangetimeInput()).to.eq('changetime');
        await blackListUpdatePage.save();
        expect(await blackListUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await blackListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last BlackList', async () => {
        const nbButtonsBeforeDelete = await blackListComponentsPage.countDeleteButtons();
        await blackListComponentsPage.clickOnLastDeleteButton();

        blackListDeleteDialog = new BlackListDeleteDialog();
        expect(await blackListDeleteDialog.getDialogTitle()).to.eq('avayaBloomAdminApp.blackList.delete.question');
        await blackListDeleteDialog.clickOnConfirmButton();

        expect(await blackListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
