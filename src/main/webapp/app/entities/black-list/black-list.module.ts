import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AvayaBloomAdminSharedModule } from 'app/shared';
import {
    BlackListComponent,
    BlackListDetailComponent,
    BlackListUpdateComponent,
    BlackListDeletePopupComponent,
    BlackListDeleteDialogComponent,
    blackListRoute,
    blackListPopupRoute
} from './';

const ENTITY_STATES = [...blackListRoute, ...blackListPopupRoute];

@NgModule({
    imports: [AvayaBloomAdminSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BlackListComponent,
        BlackListDetailComponent,
        BlackListUpdateComponent,
        BlackListDeleteDialogComponent,
        BlackListDeletePopupComponent
    ],
    entryComponents: [BlackListComponent, BlackListUpdateComponent, BlackListDeleteDialogComponent, BlackListDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AvayaBloomAdminBlackListModule {}
