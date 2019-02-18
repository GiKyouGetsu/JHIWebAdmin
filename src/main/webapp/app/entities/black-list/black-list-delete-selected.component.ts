import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BlackListService } from './black-list.service';
import { IBlackList } from 'app/shared/model/black-list.model';

@Component({
    selector: 'bloom-black-list-delete-selected',
    templateUrl: './black-list-delete-selected.component.html'
})
export class BlackListDeleteSelectedComponent {
    blackList: IBlackList[];
    ids: any;
    numbers: any;

    constructor(private blacklistService: BlackListService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDeleteSelectForm() {
        this.blacklistService.deleteSelect(this.ids, this.numbers).subscribe(
            res => {
                this.eventManager.broadcast({
                    name: 'blackListListModification',
                    content: 'Deleted some user'
                });
                this.activeModal.dismiss(true);
            },
            err => {
                this.activeModal.dismiss(true);
            }
        );
    }
}
