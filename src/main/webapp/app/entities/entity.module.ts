import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AvayaBloomAdminBlackListModule } from './black-list/black-list.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        AvayaBloomAdminBlackListModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AvayaBloomAdminEntityModule {}
