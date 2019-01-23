import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AccountService } from 'app/core';

import { SideBarApp, SideBar } from '../../shared/redux/models/sidebar.model';
import { AuthenticationState } from 'app/shared/redux/actions/sidebar.action';

@Component({
    selector: 'bloom-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['sidebar.css']
})
export class SidebarComponent implements OnInit {
    toggle: Boolean = false;
    hoverToggle: Boolean = false;
    sidebar: Observable<SideBar>;

    constructor(private store: Store<SideBarApp>, private accountService: AccountService) {
        this.sidebar = this.store.pipe(select('sidebar'));
        this.sidebar.subscribe(sidebar => {
            this.toggle = sidebar.toggle;
        });
        this.accountService.getAuthenticationState().subscribe(authState => {
            let state = false;
            authState && (state = true);
            const action = new AuthenticationState(state);
            this.store.dispatch(action);
        });
    }

    ngOnInit() {
        this.isAuthenticated() && this.store.dispatch(new AuthenticationState(true));
    }

    expandAndFold(ele_id): void {
        const ele: any = document.querySelector('#' + ele_id);
        if (ele.style.height === '0px' || ele.style.height === '') {
            ele.style.height = ele.scrollHeight + 'px';
        } else {
            ele.style.height = '0px';
        }
    }

    handleHover(): void {
        this.hoverToggle = true;
    }

    handleLeave(): void {
        this.hoverToggle = false;
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }
}
