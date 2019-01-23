import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper } from 'app/core';
import { Observable } from 'rxjs';
import { SideBar, SideBarApp } from 'app/shared/redux/models/sidebar.model';
import { Store, select } from '@ngrx/store';

@Component({
    selector: 'bloom-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.css']

})
export class BloomMainComponent implements OnInit {

    toggle: Boolean = false;
    sidebar: Observable<SideBar>;
    authState: boolean;
    constructor(private jhiLanguageHelper: JhiLanguageHelper, private router: Router, private store: Store<SideBarApp>) {
        this.sidebar = this.store.pipe(select('sidebar'));
        this.sidebar.subscribe(sidebar => {
            this.toggle = sidebar.toggle;
            this.authState = sidebar.authentication;
        });
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'avayaBloomAdminApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }
}
