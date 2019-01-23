import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBlackList } from 'app/shared/model/black-list.model';
import { BlackListService } from './black-list.service';

@Component({
    selector: 'bloom-black-list-delete-dialog',
    templateUrl: './black-list-delete-dialog.component.html'
})
export class BlackListDeleteDialogComponent {
    blackList: IBlackList;

    constructor(
        protected blackListService: BlackListService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.blackListService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'blackListListModification',
                content: 'Deleted an blackList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'bloom-black-list-delete-popup',
    template: ''
})
export class BlackListDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blackList }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BlackListDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.blackList = blackList;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
