import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IBlackList } from 'app/shared/model/black-list.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { BlackListService } from './black-list.service';
import { BlackListDeleteSelectedComponent } from './black-list-delete-selected.component';

@Component({
    selector: 'bloom-black-list',
    templateUrl: './black-list.component.html',
    styleUrls: ['./black-list.component.css']
})
export class BlackListComponent implements OnInit, OnDestroy {
    currentAccount: any;
    blackLists: IBlackList[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    // public selectedBlackLists: IBlackList[]

    // new added
    // options: ISelectBlackList[] ;
    selectedAll: any;
    // get selectedOptions() {
    //     return this.options.filter(opt => opt.checked).map(
    //         opt => opt.id
    //     )
    // }

    constructor(
        protected blackListService: BlackListService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected modalService: NgbModal
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.blackListService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IBlackList[]>) => this.paginateBlackLists(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/black-list'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/black-list',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
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
        this.eventSubscriber = this.eventManager.subscribe('blackListListModification', response => {
            console.log(response);
            this.loadAll();
        });
    }

    // registerChangeInBlackListsDELMany() {
    //     this.eventSubscriber = this.eventManager.subscribe('blackListListModification', response => this.loadAll());
    // }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateBlackLists(data: IBlackList[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.blackLists = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    protected ids(list: IBlackList[]) {
        let ids = '';
        list.forEach(el => {
            ids = ids ?  (ids + ';' + el.id) : (ids + el.id);
        });
        return ids;
    }

    selectAll() {
        this.selectedAll = !this.selectedAll;
        console.log('selectAll()');
        for (let i = 0; i < this.blackLists.length; i++) {
            this.blackLists[i].checked = this.selectedAll;
        }
    }

    checkIfAllSelected() {
        let totalSelected =  0;
        for (let i = 0; i < this.blackLists.length; i++) {
            if (this.blackLists[i].checked) {
                totalSelected ++;
            }
        }
        this.selectedAll = totalSelected === this.blackLists.length;
        return true;
    }

    delSelect() {
        const selList = this.blackLists.filter(opt => opt.checked);
        if (selList.length < 1) {
            this.onError('avayaBloomAdminApp.blackList.noselected');
            return;
        }
        console.log(selList);
        const modalRef = this.modalService.open(BlackListDeleteSelectedComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.ids = this.ids(selList);
        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
            },
            reason => {
                // Left blank intentionally, nothing to do here
            }
        );
    }
}
