/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AddReasonComponentsPage, AddReasonDeleteDialog, AddReasonUpdatePage } from './add-reason.page-object';

const expect = chai.expect;

describe('AddReason e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let addReasonUpdatePage: AddReasonUpdatePage;
    let addReasonComponentsPage: AddReasonComponentsPage;
    let addReasonDeleteDialog: AddReasonDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AddReasons', async () => {
        await navBarPage.goToEntity('add-reason');
        addReasonComponentsPage = new AddReasonComponentsPage();
        expect(await addReasonComponentsPage.getTitle()).to.eq('avayaBloomAdminApp.addReason.home.title');
    });

    it('should load create AddReason page', async () => {
        await addReasonComponentsPage.clickOnCreateButton();
        addReasonUpdatePage = new AddReasonUpdatePage();
        expect(await addReasonUpdatePage.getPageTitle()).to.eq('avayaBloomAdminApp.addReason.home.createOrEditLabel');
        await addReasonUpdatePage.cancel();
    });

    it('should create and save AddReasons', async () => {
        const nbButtonsBeforeCreate = await addReasonComponentsPage.countDeleteButtons();

        await addReasonComponentsPage.clickOnCreateButton();
        await promise.all([addReasonUpdatePage.setReasonInput('reason')]);
        expect(await addReasonUpdatePage.getReasonInput()).to.eq('reason');
        await addReasonUpdatePage.save();
        expect(await addReasonUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await addReasonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last AddReason', async () => {
        const nbButtonsBeforeDelete = await addReasonComponentsPage.countDeleteButtons();
        await addReasonComponentsPage.clickOnLastDeleteButton();

        addReasonDeleteDialog = new AddReasonDeleteDialog();
        expect(await addReasonDeleteDialog.getDialogTitle()).to.eq('avayaBloomAdminApp.addReason.delete.question');
        await addReasonDeleteDialog.clickOnConfirmButton();

        expect(await addReasonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
