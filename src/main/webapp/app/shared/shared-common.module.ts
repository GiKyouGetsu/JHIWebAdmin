import { NgModule } from '@angular/core';

import { AvayaBloomAdminSharedLibsModule, FindLanguageFromKeyPipe, BloomAlertComponent, BloomAlertErrorComponent } from './';

@NgModule({
    imports: [AvayaBloomAdminSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, BloomAlertComponent, BloomAlertErrorComponent],
    exports: [AvayaBloomAdminSharedLibsModule, FindLanguageFromKeyPipe, BloomAlertComponent, BloomAlertErrorComponent]
})
export class AvayaBloomAdminSharedCommonModule {}
