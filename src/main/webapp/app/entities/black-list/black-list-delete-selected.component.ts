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
    ids;

    constructor(private blacklistService: BlackListService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(login) {

        // this.blacklistService.delete(login).subscribe(response => {
        //     this.eventManager.broadcast({
        //         name: 'userListModification',
        //         content: 'Deleted a user'
        //     });
        //     this.activeModal.dismiss(true);
        // });
    }
}
