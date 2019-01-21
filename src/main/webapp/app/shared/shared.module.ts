import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { AvayaBloomAdminSharedLibsModule, AvayaBloomAdminSharedCommonModule, BloomLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [AvayaBloomAdminSharedLibsModule, AvayaBloomAdminSharedCommonModule],
    declarations: [BloomLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [BloomLoginModalComponent],
    exports: [AvayaBloomAdminSharedCommonModule, BloomLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AvayaBloomAdminSharedModule {
    static forRoot() {
        return {
            ngModule: AvayaBloomAdminSharedModule
        };
    }
}
