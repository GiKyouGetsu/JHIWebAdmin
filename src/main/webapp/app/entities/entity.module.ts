import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AvayaBloomAdminBlackListModule } from './black-list/black-list.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { entityRoute } from './entity.route';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        AvayaBloomAdminBlackListModule,
        // RouterModule.forChild(entityRoute)
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AvayaBloomAdminEntityModule {}
