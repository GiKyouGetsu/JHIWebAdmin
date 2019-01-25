import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { AvayaBloomAdminSharedModule } from 'app/shared';
import { AvayaBloomAdminCoreModule } from 'app/core';
import { AvayaBloomAdminAppRoutingModule } from './app-routing.module';
import { AvayaBloomAdminHomeModule } from './home/home.module';
import { AvayaBloomAdminAccountModule } from './account/account.module';
import { AvayaBloomAdminEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { BloomMainComponent, NavbarComponent, SidebarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { StoreModule } from '@ngrx/store';
import { sidebarReducer } from './shared/redux/reducers/sidebar.reducer';

@NgModule({
    imports: [
        BrowserModule,
        AvayaBloomAdminAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'bloom', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'zh-cn'
        }),
        AvayaBloomAdminSharedModule.forRoot(),
        AvayaBloomAdminCoreModule,
        AvayaBloomAdminHomeModule,
        AvayaBloomAdminAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        AvayaBloomAdminEntityModule,
        
        StoreModule.forRoot({ sidebar: sidebarReducer })
    ],
    declarations: [BloomMainComponent, SidebarComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [BloomMainComponent]
})
export class AvayaBloomAdminAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
