import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBlackList } from 'app/shared/model/black-list.model';
import { BlackListService } from './black-list.service';

@Component({
    selector: 'bloom-black-list-import',
    templateUrl: './black-list-import.component.html'
})
export class BlackListImportComponent {
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