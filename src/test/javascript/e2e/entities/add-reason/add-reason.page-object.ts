import { element, by, ElementFinder } from 'protractor';

export class AddReasonComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('bloom-add-reason div table .btn-danger'));
    title = element.all(by.css('bloom-add-reason div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddReasonUpdatePage {
    pageTitle = element(by.id('bloom-add-reason-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    reasonInput = element(by.id('field_reason'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setReasonInput(reason) {
        await this.reasonInput.sendKeys(reason);
    }

    async getReasonInput() {
        return this.reasonInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class AddReasonDeleteDialog {
    private dialogTitle = element(by.id('bloom-delete-addReason-heading'));
    private confirmButton = element(by.id('bloom-confirm-delete-addReason'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
