import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AvayaBloomAdminBlackListModule } from './black-list/black-list.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        AvayaBloomAdminBlackListModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
    
})
export class AvayaBloomAdminEntityModule {}
