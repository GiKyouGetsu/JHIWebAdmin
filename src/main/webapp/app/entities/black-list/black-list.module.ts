import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvayaBloomAdminSharedModule } from 'app/shared';
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

const ENTITY_STATES = [...blackListRoute, ...blackListPopupRoute];

@NgModule({
    imports: [AvayaBloomAdminSharedModule,FormsModule,ReactiveFormsModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BlackListComponent,
        BlackListDetailComponent,
        BlackListUpdateComponent,
        BlackListDeleteDialogComponent,
        BlackListDeletePopupComponent,
        BlackListImportComponent,
        BlackListDeleteSelectedComponent
    ],
    entryComponents: [BlackListComponent, BlackListUpdateComponent, BlackListDeleteDialogComponent, BlackListDeletePopupComponent, BlackListDeleteSelectedComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AvayaBloomAdminBlackListModule {}
