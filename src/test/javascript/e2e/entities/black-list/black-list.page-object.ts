import { element, by, ElementFinder } from 'protractor';

export class BlackListComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('bloom-black-list div table .btn-danger'));
    title = element.all(by.css('bloom-black-list div h2#page-heading span')).first();

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

export class BlackListUpdatePage {
    pageTitle = element(by.id('bloom-black-list-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    blacknumberInput = element(by.id('field_blacknumber'));
    numberSourceSelect = element(by.id('field_numberSource'));
    validityPeriodInput = element(by.id('field_validityPeriod'));
    addReasonInput = element(by.id('field_addReason'));
    applicantInput = element(by.id('field_applicant'));
    createtimeInput = element(by.id('field_createtime'));
    changetimeInput = element(by.id('field_changetime'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setBlacknumberInput(blacknumber) {
        await this.blacknumberInput.sendKeys(blacknumber);
    }

    async getBlacknumberInput() {
        return this.blacknumberInput.getAttribute('value');
    }

    async setNumberSourceSelect(numberSource) {
        await this.numberSourceSelect.sendKeys(numberSource);
    }

    async getNumberSourceSelect() {
        return this.numberSourceSelect.element(by.css('option:checked')).getText();
    }

    async numberSourceSelectLastOption() {
        await this.numberSourceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setValidityPeriodInput(validityPeriod) {
        await this.validityPeriodInput.sendKeys(validityPeriod);
    }

    async getValidityPeriodInput() {
        return this.validityPeriodInput.getAttribute('value');
    }

    async setAddReasonInput(addReason) {
        await this.addReasonInput.sendKeys(addReason);
    }

    async getAddReasonInput() {
        return this.addReasonInput.getAttribute('value');
    }

    async setApplicantInput(applicant) {
        await this.applicantInput.sendKeys(applicant);
    }

    async getApplicantInput() {
        return this.applicantInput.getAttribute('value');
    }

    async setCreatetimeInput(createtime) {
        await this.createtimeInput.sendKeys(createtime);
    }

    async getCreatetimeInput() {
        return this.createtimeInput.getAttribute('value');
    }

    async setChangetimeInput(changetime) {
        await this.changetimeInput.sendKeys(changetime);
    }

    async getChangetimeInput() {
        return this.changetimeInput.getAttribute('value');
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

export class BlackListDeleteDialog {
    private dialogTitle = element(by.id('bloom-delete-blackList-heading'));
    private confirmButton = element(by.id('bloom-confirm-delete-blackList'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
