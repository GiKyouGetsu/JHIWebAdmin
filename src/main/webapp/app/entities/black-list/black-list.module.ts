import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvayaBloomAdminSharedModule } from 'app/shared';
import { FileUploadModule } from 'ng2-file-upload';
import {
    BlackListComponent,
    BlackListDetailComponent,
    BlackListUpdateComponent,
    BlackListDeletePopupComponent,
    BlackListDeleteDialogComponent,
    BlackListImportComponent,
    BlackListDeleteSelectedComponent,
    blackListRoute,
    blackListPopupRoute
    
} from './';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

const ENTITY_STATES = [...blackListRoute, ...blackListPopupRoute];

@NgModule({
    imports: [AvayaBloomAdminSharedModule,FormsModule,ReactiveFormsModule,FileUploadModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BlackListComponent,
        BlackListDetailComponent,
        BlackListUpdateComponent,
        BlackListDeleteDialogComponent,
        BlackListDeletePopupComponent,
        BlackListImportComponent,
        BlackListDeleteSelectedComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    entryComponents: [BlackListComponent, BlackListUpdateComponent, BlackListDeleteDialogComponent, BlackListDeletePopupComponent, BlackListDeleteSelectedComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AvayaBloomAdminBlackListModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
