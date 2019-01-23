import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBlackList } from 'app/shared/model/black-list.model';
import { AccountService } from 'app/core';
import { BlackListService } from './black-list.service';

@Component({
    selector: 'bloom-black-list',
    templateUrl: './black-list.component.html'
})
export class BlackListComponent implements OnInit, OnDestroy {
    blackLists: IBlackList[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected blackListService: BlackListService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.blackListService.query().subscribe(
            (res: HttpResponse<IBlackList[]>) => {
                this.blackLists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBlackLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBlackList) {
        return item.id;
    }

    registerChangeInBlackLists() {
        this.eventSubscriber = this.eventManager.subscribe('blackListListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
